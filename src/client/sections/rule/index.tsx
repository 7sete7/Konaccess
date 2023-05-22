import { faEye, faPencil, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Container, Divider, Typography, useTheme } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import { useCallback, useContext, useMemo, useState } from 'react';
import { getModuleViewFor } from '../../DAL/Modules';
import Section from '../../components/Section';
import ViewFieldsList from '../../components/ViewFieldsList';
import { AppContext } from '../../context';
import RuleSelect, { SelectionOpt } from './RuleSelect';

type OnRuleSelect = (prop: keyof SelectionState['rules']) => (opt: SelectionOpt) => void;
interface SelectionState {
	rules: {
		view?: SelectionOpt;
		edit?: SelectionOpt;
		create?: SelectionOpt;
	};
	fields: string[];
}

const RuleSection: React.FC = () => {
	const [{ rule, module }] = useContext(AppContext);
	const [selectionState, setSelectionState] = useState<SelectionState>({ rules: {}, fields: [] });
	const viewSections = useMemo(() => getModuleViewFor(module!), [module]);
	const theme = useTheme();

	const onRuleSelect = useCallback<OnRuleSelect>(
		prop => opt => setSelectionState(current => ({ ...current, fields: { ...current.fields, [prop]: opt } })),
		[setSelectionState],
	);

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
								opts={['all', 'none', 'only-owner', 'within-group', 'within-additional-groups', 'inherit']}
								onRuleSelect={onRuleSelect('view')}
							/>
							<RuleSelect
								label="Pode editar"
								icon={faPencil}
								opts={['all', 'none', 'only-owner', 'within-group', 'within-additional-groups', 'inherit']}
								onRuleSelect={onRuleSelect('edit')}
							/>

							<RuleSelect
								label="Pode criar"
								icon={faPlusCircle}
								opts={['all', 'none', 'inherit']}
								onRuleSelect={onRuleSelect('create')}
							/>
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
