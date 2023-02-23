import Container from '@mui/material/Container';
import ModuleSection from './sections/module';
import RoleSection from './sections/role';
import RuleSection from './sections/rule';

const Home: React.FC = () => {
	return (
		<Container maxWidth="lg">
			<ModuleSection />

			{/* <Section title="Permissões">
				<ViewList viewSections={views} />
			</Section> */}
			<RoleSection />

			<RuleSection />
		</Container>
	);
};

export default Home;
