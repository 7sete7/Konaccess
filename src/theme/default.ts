import { ThemeOptions } from '@mui/material';

const DefaultTheme: ThemeOptions = {
	components: {
		MuiAccordion: {
			styleOverrides: {
				root: {
					'&:before': { display: 'none' },
				},
			},
		},
	},
};

export default DefaultTheme;
