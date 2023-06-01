import { CssBaseline, PaletteMode, ThemeProvider } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'reducers/themeSlice';

const createAppTheme = (mode?: PaletteMode) =>
  createTheme({
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: 'lg',
        },
      },
      MuiButton: {
        defaultProps: {
          size: 'medium',
          variant: 'contained',
          color: 'primary',
          disableElevation: true,
        },
        styleOverrides: {
          sizeLarge: { minHeight: 48, minWidth: 48, fontSize: 18 },
          sizeMedium: { minHeight: 40, minWidth: 40, fontSize: 16 },
          sizeSmall: { minHeight: 32, minWidth: 32, fontSize: 14 },
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'medium',
          InputLabelProps: { shrink: true },
        },
      },
      MuiDialog: {
        defaultProps: {
          maxWidth: 'sm',
          fullWidth: true,
        },
      },
    },
    typography: {
      fontFamily: 'Nunito Sans',
      button: { fontWeight: 700, textTransform: 'none' },
      h1: { fontSize: 56, lineHeight: 1.2, fontWeight: 700 },
      h2: { fontSize: 48, lineHeight: 1.2, fontWeight: 700 },
      h3: { fontSize: 32, lineHeight: 1.2, fontWeight: 700 },
      h4: { fontSize: 24, lineHeight: 1.2, fontWeight: 700 },
      h5: { fontSize: 20, lineHeight: 1.2, fontWeight: 700 },
      h6: { fontSize: 16, lineHeight: 1.2, fontWeight: 700 },
    },
    palette: {
      primary: {
        main: '#673ab7',
      },
      secondary: {
        main: '#59A059',
      },
      mode,
    },
    shape: {
      borderRadius: 4,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1600,
      },
    },
  });

type Props = {
  children: JSX.Element;
};

const AppTheme = ({ children }: Props) => {
  const { mode } = useSelector(themeSelector);

  useEffect(() => {
    document.body.dataset.theme = mode;
    document.body.className = mode;
  }, [mode]);

  return (
    <ThemeProvider theme={responsiveFontSizes(createAppTheme(mode))}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
