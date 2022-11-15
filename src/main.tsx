import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './views/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PartialTheme, ThemeProvider } from '@fluentui/react/lib/Theme';
import './styles/index.scss';

const router = createBrowserRouter([{ path: '/', element: <Home /> }]);

const theme: PartialTheme = {
	palette: {
		themePrimary: 'blue',
	},
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>,
);
