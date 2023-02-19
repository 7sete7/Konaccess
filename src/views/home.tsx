import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useMemo } from 'react';
import ModuleCard from '../components/ModuleCard';
import Section from '../components/Section';
import ViewList from '../components/ViewList';
import { getModules, getModuleViewFor } from '../DAL/Modules';

const Home: React.FC = () => {
	const modules = useMemo(getModules, []);
	const views = useMemo(() => getModuleViewFor('Product'), []);

	return (
		<Container maxWidth="lg">
			<Section title="Módulo">
				<Stack direction="row" spacing={2}>
					{modules.map((module, idx) => (
						<ModuleCard {...module} key={`${module.title}-${idx}`} />
					))}
				</Stack>
			</Section>

			<Section title="Permissões">
				<ViewList viewSections={views} />
			</Section>
		</Container>
	);
};

export default Home;
