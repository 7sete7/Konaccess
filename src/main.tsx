import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles';
import React, { Fragment, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import HomePage from './HomePage';
import './styles/index.scss';
import DefaultTheme from './theme/default';

const App: React.FC = () => {
	const [themeOpts, setThemeOpts] = useState<ThemeOptions>(DefaultTheme);
	const theme = useMemo(() => createTheme(themeOpts), [themeOpts]);

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
