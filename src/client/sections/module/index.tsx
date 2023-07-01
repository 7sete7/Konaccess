import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getModules } from '../../DAL/Modules';
import ModuleCard from '../../components/ModuleCard';
import Section from '../../components/Section';

const ModuleSection: React.FC = () => {
	const allModules = useRef<KonectyClient.Module[]>([]);
	const [filteredModules, setFilteredModules] = useState<KonectyClient.Module[]>([]);

	useEffect(() => {
		getModules().then(mods => {
			allModules.current = mods;
			setFilteredModules(mods);
		});
	}, []);

	const onFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase();
		if (value.length === 0) {
			setFilteredModules(allModules.current);
		} else {
			setFilteredModules(allModules.current.filter(module => module.title.toLowerCase().includes(value)));
		}
	}, []);

	return (
		<Section title="Módulo">
			{allModules.current.length === 0 && <p>Loading...</p>}
			{filteredModules.length === 0 && allModules.current.length !== 0 && <p>No hay modules</p>}

			<Box>
				{filteredModules.length > 0 && (
					<Stack direction="row" spacing={2} overflow="auto">
						{filteredModules.map((module, idx) => (
							<ModuleCard {...module} key={`${module.title}-${idx}`} />
						))}
					</Stack>
				)}

				<Box mt={3}>
					<TextField
						variant="outlined"
						placeholder="Filtrar"
						onChange={onFilterChange}
						inputProps={{ style: { padding: '8px' } }}
					/>
				</Box>
			</Box>
		</Section>
	);
};

export default ModuleSection;
