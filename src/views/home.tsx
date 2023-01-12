import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { useMemo } from 'react';
import ModuleCard from '../components/ModuleCard';
import StackSection from '../components/StackSection';

const Home: React.FC = () => {
	const modules = useMemo(
		() => [
			{ title: 'Imóveis', iconName: 'building', version: { name: '1.3', date: new Date() } },
			{ title: 'Empreendimentos', iconName: 'flag', version: { name: '1.0', date: new Date() } },
		],
		[],
	);

	return (
		<Stack tokens={{ childrenGap: 10 }} horizontalAlign="center">
			<StackSection tokens={{ padding: 10 }}>
				<Text variant="large">Módulo</Text>

				<Stack tokens={{ childrenGap: 6 }} horizontal>
					{modules.map((module, idx) => (
						<Stack.Item tokens={{ padding: 20 }} key={`${module.title}-${idx}`}>
							<ModuleCard {...module} />
						</Stack.Item>
					))}
				</Stack>
			</StackSection>
		</Stack>
	);
};

export default Home;
