module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: true,
  theme: {
    colors: {
      primary: {
        light: 'var(--color-primary-light)',
        main: 'var(--color-primary-main)',
        dark: 'var(--color-primary-dark)',
      },
      secondary: {
        light: 'var(--color-secondary-light)',
        main: 'var(--color-secondary-main)',
        dark: 'var(--color-secondary-dark)',
      },
      transparent: 'rgba(0, 0, 0, 0)',
      white: '#ffffff',
      black: '#000000',
    },
    extend: {
      boxShadow: {
        xs: '0px 1px 2px rgba(0, 0, 0, 0.16)',
        sm: '0px 1px 4px rgba(0, 0, 0, 0.16)',
        md: '0px 2px 6px rgba(0, 0, 0, 0.16)',
      },
    },
    screens: {
      mobile: { max: '900px' },
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1600px',
    },
  },
  darkmode: 'class',
  plugins: [],
};
