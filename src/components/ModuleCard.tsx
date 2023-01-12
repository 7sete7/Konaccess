import { ImageFit } from '@fluentui/react';
import { DocumentCard, DocumentCardActivity, DocumentCardImage, DocumentCardTitle } from '@fluentui/react/lib/DocumentCard';
import { useTheme } from '@fluentui/react/lib/Theme';
import * as FaIcons from '@fortawesome/free-solid-svg-icons';
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
	const icon = useMemo<FaIcons.IconDefinition>(() => {
		const name = `fa${capitalize(iconName)}` as keyof typeof FaIcons;
		return (FaIcons[name] ?? FaIcons.faBugSlash) as FaIcons.IconDefinition;
	}, [iconName]);

	return (
		<DocumentCard>
			<DocumentCard>
				<DocumentCardImage
					height={100}
					imageSrc={iconAsDataURI({ color: theme.palette.themeDark, icon, size: '4x' })}
					imageFit={ImageFit.centerContain}
				/>

				<DocumentCardTitle title={title} shouldTruncate />

				<DocumentCardActivity
					activity={formatDate(version.date)}
					people={[{ name: `Versão ${version.name}`, profileImageSrc: '' }]}
				/>
			</DocumentCard>
		</DocumentCard>
	);
};

export default ModuleCard;
