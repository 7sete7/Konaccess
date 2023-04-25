import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { getModules } from '../../DAL/Modules';
import ModuleCard from '../../components/ModuleCard';
import Section from '../../components/Section';

const ModuleSection: React.FC = () => {
	const [modules, setModules] = useState<KonectyClient.Module[]>([]);

	useEffect(() => {
		getModules().then(setModules);
	}, []);

	return (
		<Section title="Módulo">
			{modules.length === 0 && <p>No hay módulos disponibles</p>}

			{modules.length > 0 && (
				<Stack direction="row" spacing={2}>
					{modules.map((module, idx) => (
						<ModuleCard {...module} key={`${module.title}-${idx}`} />
					))}
				</Stack>
			)}
		</Section>
	);
};

export default ModuleSection;
