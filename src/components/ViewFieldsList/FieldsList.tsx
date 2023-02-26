import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import type { ViewField } from '../../DAL/Modules';

interface FieldsListProps {
	fields: ViewField[];
	onFieldClick: (name: string) => React.MouseEventHandler;
	isSelected: (name: string) => boolean;
}

const FieldsList: React.FC<FieldsListProps> = ({ fields, onFieldClick, isSelected }) => (
	<List>
		{fields.map(({ label, name }) => (
			<ListItem key={name}>
				<ListItemButton onClick={onFieldClick(name)}>
					<ListItemIcon>
						<Checkbox
							checked={isSelected(name)}
							edge="start"
							disableRipple
							tabIndex={-1}
							inputProps={{ 'aria-labelledby': name }}
						/>
					</ListItemIcon>
					<ListItemText id={name} primary={label} />
				</ListItemButton>
			</ListItem>
		))}
	</List>
);

export default FieldsList;
