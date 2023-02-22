import { ThemeOptions } from '@mui/material/styles';

const DefaultTheme: ThemeOptions = {
	components: {
		MuiAccordion: {
			styleOverrides: {
				root: {
					'&:before': { display: 'none' },
				},
			},
		},
		MuiSelect: {
			styleOverrides: {
				standard: {
					'&::before': {
						display: 'none',
					},
					'&::after': {
						display: 'none',
					},
					paddingBottom: 0,
					paddingTop: 0,
					backgroundColor: 'unset',
				},
			},
		},
	},
	palette: {
		grey: {
			500: 'rgba(211, 211, 211, 0.6)',
			700: 'rgba(102, 102, 102, 0.6)',
		},
	},
	typography: {
		allVariants: {
			fontFamily: 'Noto sans, Roboto',
		},
		caption: {
			fontWeight: '600',
		},
	},
};

export default DefaultTheme;
