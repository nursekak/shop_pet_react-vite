
import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  // Проверяем системные настройки
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light' // по умолчанию светлая тема
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('theme', state.mode);
    },
    initTheme: (state) => {
      state.mode = getInitialTheme();
    }
  }
});

export const { toggleTheme, setTheme, initTheme } = themeSlice.actions;

export default themeSlice.reducer;
