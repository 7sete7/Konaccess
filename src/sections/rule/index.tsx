import { faEye, faPencil, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Container, Divider, Typography, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import { useContext, useMemo } from 'react';
import Section from '../../components/Section';
import ViewFieldsList from '../../components/ViewFieldsList';
import { AppContext } from '../../context';
import { getModuleViewFor } from '../../DAL/Modules';
import RuleSelect from './RuleSelect';

const RuleSection: React.FC = () => {
	const [{ rule, module }] = useContext(AppContext);
	const viewSections = useMemo(() => getModuleViewFor(module!), [module]);
	const theme = useTheme();

	if (rule == null) return null;

	return (
		<Section title={`Regra ${rule.label}`}>
			<Container maxWidth="md">
				<Stack spacing={2} divider={<Divider />}>
					<Box py={2} px={3}>
						<Stack spacing={3}>
							<RuleSelect
								label="Pode visualizar"
								icon={faEye}
								opts={['yes', 'no', 'only-owner', 'within-group', 'within-additional-groups']}
							/>
							<RuleSelect
								label="Pode editar"
								icon={faPencil}
								opts={['yes', 'no', 'only-owner', 'within-group', 'within-additional-groups']}
							/>

							<RuleSelect label="Pode criar" icon={faPlusCircle} opts={['yes', 'no']} />
						</Stack>
					</Box>
				</Stack>
			</Container>

			<Divider />

			<Box mt={2}>
				<Typography variant="h6" gutterBottom paragraph>
					Campos
				</Typography>
				<Container maxWidth="sm">
					<ViewFieldsList viewSections={viewSections} />
				</Container>
			</Box>
		</Section>
	);
};

export default RuleSection;
