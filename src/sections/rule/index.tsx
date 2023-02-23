import { faEye, faPencil, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import { useContext } from 'react';
import Section from '../../components/Section';
import { AppContext } from '../../context';
import RuleSelect from './RuleSelect';

const RuleSection: React.FC = () => {
	const [{ rule }] = useContext(AppContext);

	if (rule == null) return null;

	return (
		<Section title={`Regra ${rule.label}`}>
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
		</Section>
	);
};

export default RuleSection;
