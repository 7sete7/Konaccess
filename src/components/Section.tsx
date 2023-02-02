import Paper, { PaperProps } from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type SectionProps = {
	title: string;
} & PaperProps;

const Section: React.FC<SectionProps> = ({ title, ...props }) => (
	<Paper {...props} sx={{ padding: 3, width: 1, mt: 3 }}>
		<Typography variant="h5" color="textPrimary">
			{title}
		</Typography>

		{props.children}
	</Paper>
);

export default Section;
