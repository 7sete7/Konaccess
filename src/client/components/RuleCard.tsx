import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Card, CardActionArea, CardContent, CardHeader, IconButton, SxProps, Theme, Typography } from '@mui/material';
import { useContext } from 'react';
import { AppContext } from '../context';

const MAX_DISPLAY_FIELDS = 5;

const RuleCard: React.FC<KonectyClient.Rule & { role: string }> = ({ _id, label, fields, totalFields, options, role }) => {
	const [, { selectRule }] = useContext(AppContext);

	return (
		<Card sx={cardSx} elevation={0}>
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
			<CardActionArea onClick={() => selectRule({ _id, label, fields, totalFields, options }, role)}>
				<CardContent sx={{ bgcolor: 'grey.500', borderBottom: 0, borderTop: 0, borderColor: 'text.primary' }}>
					<Box p={1} display="flex" flexDirection="column">
						{fields.slice(0, MAX_DISPLAY_FIELDS).map(field => (
							<Typography variant="caption" fontSize="12pt" color="grey.700" key={field}>
								{field}
							</Typography>
						))}
						{totalFields > MAX_DISPLAY_FIELDS && (
							<Typography variant="caption" fontSize="12pt" color="grey.700">
								+ {totalFields - MAX_DISPLAY_FIELDS}
							</Typography>
						)}
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

const cardSx: SxProps<Theme> = theme => ({
	width: '100%',
	'&:hover': {
		boxShadow: theme.shadows[3],
		backgroundColor: theme.palette.grey[100],
		opacity: 1 - theme.palette.action.hoverOpacity,
	},
});

export default RuleCard;
