import { Accordion, AccordionDetails, AccordionProps, AccordionSummary } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import { useCallback, useMemo, useState } from 'react';
import RuleCard from '../../components/RuleCard';
import Section from '../../components/Section';
import { getRolesFor } from '../../DAL/Modules';

type AccordionChangeCb = (name: string) => AccordionProps['onChange'];

const RoleSection: React.FC = () => {
	const [expanded, setExpanded] = useState<string | null>(null);
	const roles = useMemo(() => getRolesFor('Product'), []);

	const onAccordionChange = useCallback<AccordionChangeCb>(name => (_, isExpanded) => setExpanded(isExpanded ? name : null), []);
	const isExpanded = useCallback((name: string) => expanded === name, [expanded]);

	return (
		<Section title="Papel">
			{roles.map(({ _id, label, rules }) => (
				<Accordion expanded={isExpanded(_id)} onChange={onAccordionChange(_id)} key={_id}>
					<AccordionSummary style={{ backgroundColor: '#eee' }}>{label}</AccordionSummary>
					<AccordionDetails>
						<Box p={2}>
							<Stack direction="row" spacing={2} whiteSpace="nowrap" overflow="auto" display="block">
								{rules.map(rule => (
									<Box
										display="inline-block"
										sx={{ width: { xs: '90%', sm: '70%', md: '40%', lg: '30%' } }}
										key={rule._id}
									>
										<RuleCard {...rule} />
									</Box>
								))}
							</Stack>
						</Box>
					</AccordionDetails>
				</Accordion>
			))}
		</Section>
	);
};

export default RoleSection;
