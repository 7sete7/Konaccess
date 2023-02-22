import { faEye, faPencil, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Accordion,
	AccordionDetails,
	AccordionProps,
	AccordionSummary,
	Divider,
	MenuItem,
	Select,
	Typography,
	useTheme,
} from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import { useCallback, useContext, useMemo, useRef, useState } from 'react';
import ModuleCard from './components/ModuleCard';
import RuleCard from './components/RuleCard';
import Section from './components/Section';
import { AppContext } from './context';
import { getModules, getModuleViewFor, getRolesFor } from './DAL/Modules';

type AccordionChangeCb = (name: string) => AccordionProps['onChange'];

const Home: React.FC = () => {
	const [expanded, setExpanded] = useState<string | null>(null);
	const [{ rule }] = useContext(AppContext);

	const visualizeRef = useRef<HTMLDivElement>(null);
	const theme = useTheme();

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

			{rule != null && (
				<Section title={`Regra ${rule.label}`}>
					<Stack spacing={2} divider={<Divider />}>
						<Box py={2} px={3}>
							<Stack spacing={3}>
								<Box
									id="input-all"
									display="flex"
									flexWrap="nowrap"
									width="fit-content"
									sx={{ border: 1, borderColor: 'text.secondary', borderRadius: 3 }}
								>
									<Box
										id="label"
										py={1}
										px={2}
										bgcolor="grey.200"
										display="flex"
										sx={{ borderRadius: 3, borderTopRightRadius: 0, borderBottomRightRadius: 3 }}
										ref={visualizeRef}
									>
										<Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.dark' }}>
											<FontAwesomeIcon icon={faEye} />
											<Typography color="text.primary" align="right">
												Pode visualizar
											</Typography>
										</Stack>
									</Box>
									<Box id="label" py={1} px={2}>
										<Select variant="standard">
											<MenuItem value="yes">Sim</MenuItem>
											<MenuItem value="no">Não</MenuItem>
											<MenuItem value="only-owner">Apenas o responsável</MenuItem>
											<MenuItem value="within-group">Quem estiver no mesmo grupo do responsável</MenuItem>
											<MenuItem value="within-additional-groups">
												Quem estiver nos grupos adcionais do responsável
											</MenuItem>
										</Select>
									</Box>
								</Box>

								<Box
									id="input-all"
									display="flex"
									flexWrap="nowrap"
									width="fit-content"
									sx={{ border: 1, borderColor: 'text.secondary', borderRadius: 3 }}
								>
									<Box
										id="label"
										py={1}
										px={2}
										bgcolor="grey.200"
										minWidth={visualizeRef?.current?.clientWidth}
										display="flex"
										sx={{ borderRadius: 3, borderTopRightRadius: 0, borderBottomRightRadius: 3 }}
									>
										<Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.dark' }}>
											<FontAwesomeIcon icon={faPencil} />
											<Typography color="text.primary" align="right">
												Pode editar
											</Typography>
										</Stack>
									</Box>
									<Box id="label" py={1} px={2}>
										<Select variant="standard">
											<MenuItem value="yes">Sim</MenuItem>
											<MenuItem value="no">Não</MenuItem>
											<MenuItem value="only-owner">Apenas o responsável</MenuItem>
											<MenuItem value="within-group">Quem estiver no mesmo grupo do responsável</MenuItem>
											<MenuItem value="within-additional-groups">
												Quem estiver nos grupos adcionais do responsável
											</MenuItem>
										</Select>
									</Box>
								</Box>

								<Box
									id="input-all"
									display="flex"
									flexWrap="nowrap"
									width="fit-content"
									sx={{ border: 1, borderColor: 'text.secondary', borderRadius: 3 }}
								>
									<Box
										id="label"
										py={1}
										px={2}
										bgcolor="grey.200"
										minWidth={visualizeRef?.current?.clientWidth}
										display="flex"
										sx={{
											borderRadius: 3,
											borderTopRightRadius: 0,
											borderBottomRightRadius: 3,
										}}
									>
										<Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.dark' }}>
											<FontAwesomeIcon icon={faPlusCircle} />
											<Typography color="text.primary" align="right">
												Pode criar
											</Typography>
										</Stack>
									</Box>
									<Box id="label" py={1} px={2}>
										<Select variant="standard">
											<MenuItem value="yes">Sim</MenuItem>
											<MenuItem value="no">Não</MenuItem>
										</Select>
									</Box>
								</Box>
							</Stack>
						</Box>
					</Stack>
				</Section>
			)}
		</Container>
	);
};

export default Home;
