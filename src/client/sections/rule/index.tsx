import { faEye, faPencil, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, Container, Divider, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import { useCallback, useContext, useState } from 'react';
import Section from '../../components/Section';
import ViewFieldsList from '../../components/ViewFieldsList';
import { AppContext } from '../../context';
import RuleSelect, { SelectionOpt } from './RuleSelect';

type OnRuleSelect = (prop: keyof SelectionState['rules']) => (opt: SelectionOpt) => void;
type OnFieldSelect = (fields: string[]) => void;

interface SelectionState {
	rules: KonectyClient.RuleOptions;
	fields: string[];
}

const RuleSection: React.FC = () => {
	const [{ rule }, { updateRule, saveRule }] = useContext(AppContext);
	const [hasChanges, setHasChanges] = useState(false);

	const onRuleSelect = useCallback<OnRuleSelect>(
		prop => opt => {
			updateRule({ options: { ...rule?.options, [prop]: opt } });
			setHasChanges(true);
		},
		[rule],
	);

	const onFieldSelect = useCallback<OnFieldSelect>(fields => {
		updateRule({ fields });
		setHasChanges(true);
	}, []);

	const onTitleChange = useCallback((newTitle: string) => {
		updateRule({ label: newTitle.replace(/^Regra /, '') });
		setHasChanges(true);
	}, []);

	const onSave = useCallback(() => {
		saveRule();
	}, [saveRule]);

	if (rule == null) return null;

	return (
		<Section title={`Regra ${rule.label}`} titleEditable onTitleChange={onTitleChange}>
			<Container maxWidth="md">
				<Stack spacing={2}>
					<Box py={2} px={3}>
						<Stack spacing={3}>
							<RuleSelect
								label="Pode visualizar"
								icon={faEye}
								opts={['all', 'none', 'only-owner', 'within-group', 'within-additional-groups', 'inherit']}
								onRuleSelect={onRuleSelect('view')}
								value={rule.options?.view}
							/>
							<RuleSelect
								label="Pode editar"
								icon={faPencil}
								opts={['all', 'none', 'only-owner', 'within-group', 'within-additional-groups', 'inherit']}
								onRuleSelect={onRuleSelect('edit')}
								value={rule.options?.edit}
							/>

							<RuleSelect
								label="Pode criar"
								icon={faPlusCircle}
								opts={['all', 'none', 'inherit']}
								onRuleSelect={onRuleSelect('create')}
								value={rule.options?.create}
							/>
						</Stack>
					</Box>
					<Box py={2} px={3} display="flex" justifyContent="flex-end">
						<Button variant="contained" color="success" disableElevation disabled={!hasChanges} onClick={onSave}>
							Salvar alterações
						</Button>
					</Box>
				</Stack>
			</Container>

			<Divider />

			<Box mt={2}>
				<Typography variant="h6" gutterBottom paragraph>
					Campos
				</Typography>
				<Container maxWidth="sm">
					<ViewFieldsList selected={rule.fields} onSelectedChanged={onFieldSelect} />
				</Container>
			</Box>
		</Section>
	);
};

export default RuleSection;
