import { IStackItemProps, Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { DocumentCard, DocumentCardActivity, DocumentCardImage, DocumentCardTitle } from '@fluentui/react/lib/DocumentCard';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@fluentui/react/lib/Theme';
import { ImageFit } from '@fluentui/react';
import svgAsString from '../utils/svgAsString';

const StackSection: React.FC<IStackItemProps> = ({ ...props }) => (
	<Stack.Item
		{...props}
		styles={{
			root: {
				boxShadow: '0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%)',
				borderRadius: 2,
				backgroundColor: '#fff',
				minWidth: 400,
				width: '60%',
			},
		}}
	>
		{props.children}
	</Stack.Item>
);

//icon-bug
const ModuleCard: React.FC<{ inverse?: boolean }> = ({ inverse }) => {
	const theme = useTheme();

	return (
		<DocumentCard>
			<DocumentCard>
				{/* <Stack tokens={{ padding: '8px 16px' }} styles={{ inner: { alignContent: 'start' } }}>
					<FontAwesomeIcon icon={faBuilding} size="4x" width={50} height={50} color={theme.palette.themeDark} />
				</Stack> */}

				<DocumentCardImage
					height={100}
					imageSrc={`data:image/svg+xml;base64,${btoa(
						svgAsString({ color: theme.palette.themeDark, icon: faBuilding, size: '4x' }),
					)}`}
					styles={{ centeredIcon: { objectFit: 'none', width: `100%` } }}
					imageFit={ImageFit.centerContain}
				/>

				<DocumentCardTitle title="Imóveis" shouldTruncate />

				<DocumentCardActivity activity="24/10/20" people={[{ name: 'Versão 1.3', profileImageSrc: '' }]} />
			</DocumentCard>
		</DocumentCard>
	);
};

const Home: React.FC = () => {
	return (
		<Stack tokens={{ childrenGap: 10 }} horizontalAlign="center">
			<StackSection tokens={{ padding: 10 }}>
				<Text variant="large">Módulo</Text>

				<Stack tokens={{ childrenGap: 6 }} horizontal>
					<Stack.Item tokens={{ padding: 20 }}>
						<ModuleCard inverse />
					</Stack.Item>
					<Stack.Item tokens={{ padding: 20 }}>
						<ModuleCard />
					</Stack.Item>
				</Stack>
			</StackSection>
		</Stack>
	);
};

export default Home;
