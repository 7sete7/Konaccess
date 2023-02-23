import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem, Select, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import { useCallback, useMemo } from 'react';

interface RuleSelectProps {
	label: string;
	icon: IconDefinition;
	opts: ('yes' | 'no' | 'only-owner' | 'within-group' | 'within-additional-groups')[];
}

const RuleSelect: React.FC<RuleSelectProps> = ({ label, icon, opts }) => {
	const option = useCallback(
		(opt: RuleSelectProps['opts'][number], node: React.ReactNode) => (opts.includes(opt) ? node : []),
		[],
	);
	const selectItems = useMemo<React.ReactNode[]>(
		() =>
			Array<React.ReactNode>()
				.concat(option('yes', <MenuItem value="yes">Sim</MenuItem>))
				.concat(option('no', <MenuItem value="no">Não</MenuItem>))
				.concat(option('only-owner', <MenuItem value="only-owner">Apenas o responsável</MenuItem>))
				.concat(
					option('within-group', <MenuItem value="within-group">Quem estiver no mesmo grupo do responsável</MenuItem>),
				)
				.concat(
					option(
						'within-additional-groups',
						<MenuItem value="within-additional-groups">Quem estiver nos grupos adcionais do responsável</MenuItem>,
					),
				),
		[opts],
	);

	return (
		<Box
			display="flex"
			flexWrap="nowrap"
			width="fit-content"
			sx={{ border: 1, borderColor: 'text.secondary', borderRadius: 3 }}
		>
			<Box
				py={1}
				px={2}
				bgcolor="grey.200"
				display="flex"
				sx={{ borderRadius: 3, borderTopRightRadius: 0, borderBottomRightRadius: 3 }}
			>
				<Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'primary.dark' }}>
					<FontAwesomeIcon icon={icon} />
					<Typography color="text.primary" align="right">
						{label}
					</Typography>
				</Stack>
			</Box>
			<Box py={1} px={2}>
				<Select variant="standard">{selectItems}</Select>
			</Box>
		</Box>
	);
};

export default RuleSelect;
