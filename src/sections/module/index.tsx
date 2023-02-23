import Stack from '@mui/material/Stack';
import { useMemo } from 'react';
import ModuleCard from '../../components/ModuleCard';
import Section from '../../components/Section';
import { getModules } from '../../DAL/Modules';

const ModuleSection: React.FC = () => {
	const modules = useMemo(getModules, []);

	return (
		<Section title="Módulo">
			<Stack direction="row" spacing={2}>
				{modules.map((module, idx) => (
					<ModuleCard {...module} key={`${module.title}-${idx}`} />
				))}
			</Stack>
		</Section>
	);
};

export default ModuleSection;
