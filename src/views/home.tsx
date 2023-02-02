import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useMemo } from 'react';
import ModuleCard from '../components/ModuleCard';
import Section from '../components/Section';

type KonectyViewFields = {
	icon: string;
};
const konectyFields = [];

const Home: React.FC = () => {
	const modules = useMemo(
		() => [
			{ title: 'Imóveis', iconName: 'building', version: { name: '1.3', date: new Date() } },
			{ title: 'Empreendimentos', iconName: 'flag', version: { name: '1.0', date: new Date() } },
		],
		[],
	);

	return (
		<Container maxWidth="lg">
			<Section title="Módulo">
				<Stack direction="row" spacing={2} mt={2}>
					{modules.map((module, idx) => (
						<ModuleCard {...module} key={`${module.title}-${idx}`} />
					))}
				</Stack>
			</Section>
		</Container>
	);
};

export default Home;
