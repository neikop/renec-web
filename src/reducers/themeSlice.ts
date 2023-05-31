import { PaletteMode } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type SwitchThemePayload = {
  mode?: PaletteMode;
  align?: AlignMode;
};

type ThemeState = {
  mode: PaletteMode;
  align: AlignMode;
};

const initialState: ThemeState = {
  mode: 'light',
  align: 'stream',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: (state, { payload }: PayloadAction<SwitchThemePayload>) => {
      return { ...state, ...payload };
    },
  },
});

export const { switchTheme } = themeSlice.actions;
export const themeSelector = ({ theme }: RootState) => ({
  ...theme,
  isDark: theme.mode === 'dark',
  isCard: theme.align === 'card',
});
