import * as FaIcons from '@fortawesome/free-solid-svg-icons';
import { Avatar, CardContent, CardHeader, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { useTheme } from '@mui/material/styles';
import capitalize from 'lodash/capitalize';
import { useMemo } from 'react';
import { formatDate } from '../utils/formats';
import iconAsDataURI from '../utils/iconAsDataURI';

interface ModuleCardProps {
	title: string;
	version: {
		name: string;
		date: Date;
	};
	iconName: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, iconName, version }) => {
	const theme = useTheme();

	const icon = useMemo<string>(() => {
		const name = `fa${capitalize(iconName)}` as keyof typeof FaIcons;
		const iconDef = (FaIcons[name] ?? FaIcons.faBugSlash) as FaIcons.IconDefinition;

		return iconAsDataURI({ color: theme.palette.info.main, icon: iconDef, size: '4x' });
	}, [iconName]);

	return (
		<Card sx={{ minWidth: 250 }}>
			<CardActionArea>
				<CardMedia image={icon} height="150" component="img" sx={{ objectFit: 'none', backgroundColor: '#eeeeee' }} />
				<CardContent>
					<Typography variant="h6" gutterBottom>
						{title}
					</Typography>
					<CardHeader
						sx={{ padding: 1 }}
						avatar={<Avatar sx={{ fontSize: '10pt', bgcolor: 'secondary.main' }}>V{version.name}</Avatar>}
						title={`Versão ${version.name}`}
						subheader={formatDate(version.date)}
					/>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ModuleCard;
