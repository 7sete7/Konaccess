import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper, { PaperProps } from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';

type SectionProps = {
	title: string;
	titleEditable?: boolean;
	onTitleChange?: (newTitle: string) => void;
} & PaperProps;

const Section: React.FC<SectionProps> = ({ title, titleEditable = false, onTitleChange, ...props }) => {
	const [editingTitle, setEditingTitle] = useState(false);
	const [titleValue, setTitleValue] = useState(title);

	const onActionClick = useCallback(() => {
		if (editingTitle === false) {
			setEditingTitle(true);
			return;
		}

		onTitleChange?.(titleValue);
		setEditingTitle(false);
	}, [editingTitle, titleValue, onTitleChange]);

	const onTitleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setTitleValue(e.target.value);
	}, []);

	return (
		<Paper {...props} sx={{ padding: 3, width: 1, mt: 3 }}>
			<Box display="flex" justifyContent="space-between" alignItems="flex-start">
				{editingTitle ? (
					<TextField variant="standard" value={titleValue} onChange={onTitleInputChange} fullWidth autoFocus />
				) : (
					<Typography variant="h5" color="textPrimary" gutterBottom paddingBottom={2}>
						{title}
					</Typography>
				)}

				{titleEditable && (
					<IconButton size="small" color="primary" sx={{ p: 2 }} onClick={onActionClick}>
						{editingTitle ? <FontAwesomeIcon icon={faSave} /> : <FontAwesomeIcon icon={faPencilAlt} />}
					</IconButton>
				)}
			</Box>

			{props.children}
		</Paper>
	);
};

export default Section;
