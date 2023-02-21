import CssBaseline from '@mui/material/CssBaseline';
import { ThemeOptions, ThemeProvider } from '@mui/material/styles';
import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage';
import './styles/index.scss';
import DefaultTheme from './theme/default';

const App: React.FC = () => {
	const [theme, setTheme] = useState<ThemeOptions>(DefaultTheme);
	return (
		<Fragment>
			<React.StrictMode>
				<CssBaseline />
				<ThemeProvider theme={theme}>
					<HomePage />
				</ThemeProvider>
			</React.StrictMode>
		</Fragment>
	);
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
