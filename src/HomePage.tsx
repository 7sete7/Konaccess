import { Accordion, AccordionDetails, AccordionProps, AccordionSummary } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import { useCallback, useMemo, useState } from 'react';
import ModuleCard from './components/ModuleCard';
import RuleCard from './components/RuleCard';
import Section from './components/Section';
import { getModules, getModuleViewFor, getRolesFor } from './DAL/Modules';

type AccordionChangeCb = (name: string) => AccordionProps['onChange'];

const Home: React.FC = () => {
	const [expanded, setExpanded] = useState<string | null>(null);

	const modules = useMemo(getModules, []);
	const views = useMemo(() => getModuleViewFor('Product'), []);
	const roles = useMemo(() => getRolesFor('Product'), []);

	const onAccordionChange = useCallback<AccordionChangeCb>(name => (_, isExpanded) => setExpanded(isExpanded ? name : null), []);
	const isExpanded = useCallback((name: string) => expanded === name, [expanded]);

	return (
		<Container maxWidth="lg">
			<Section title="Módulo">
				<Stack direction="row" spacing={2}>
					{modules.map((module, idx) => (
						<ModuleCard {...module} key={`${module.title}-${idx}`} />
					))}
				</Stack>
			</Section>

			{/* <Section title="Permissões">
				<ViewList viewSections={views} />
			</Section> */}
			<Section title="Papel">
				{roles.map(({ _id, label, rules }) => (
					<Accordion expanded={isExpanded(_id)} onChange={onAccordionChange(_id)}>
						<AccordionSummary style={{ backgroundColor: '#eee' }}>{label}</AccordionSummary>
						<AccordionDetails>
							<Box p={2}>
								<Stack direction="row" spacing={2} whiteSpace="nowrap" overflow="auto" display="block">
									{rules.map(rule => (
										<Box display="inline-block" sx={{ width: { xs: '90%', sm: '70%', md: '40%', lg: '30%' } }}>
											<RuleCard {...rule} />
										</Box>
									))}
								</Stack>
							</Box>
						</AccordionDetails>
					</Accordion>
				))}
			</Section>
		</Container>
	);
};

export default Home;
