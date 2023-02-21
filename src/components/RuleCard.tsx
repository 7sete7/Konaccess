import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { Rule } from '../DAL/Modules';

const RuleCard: React.FC<Rule> = ({ _id, label, fields, totalFields }) => {
	return (
		<Card sx={{ width: '100%' }} elevation={0}>
			<CardHeader
				action={
					<IconButton aria-label="Menu">
						<FontAwesomeIcon icon={faEllipsisVertical} width={15} height={15} />
					</IconButton>
				}
				title={
					<Typography variant="h6" color="textPrimary.dark">
						{label}
					</Typography>
				}
				sx={{ border: 0, borderColor: '', borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
			/>
			<CardContent sx={{ bgcolor: 'grey.500', borderBottom: 0, borderTop: 0, borderColor: 'text.primary' }}>
				<Box p={1} display="flex" flexDirection="column">
					{fields.map(field => (
						<Typography variant="caption" fontSize="12pt" color="grey.700">
							{field}
						</Typography>
					))}
					{totalFields > fields.length && (
						<Typography variant="caption" fontSize="12pt" color="grey.700">
							+ {totalFields - fields.length}
						</Typography>
					)}
				</Box>
			</CardContent>
		</Card>
	);
};

export default RuleCard;
