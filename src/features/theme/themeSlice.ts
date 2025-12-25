import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialTheme = typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'light') : 'light'

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: initialTheme },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', state.mode)
      if (state.mode === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    },
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.mode = action.payload
      localStorage.setItem('theme', state.mode)
      if (state.mode === 'dark') document.documentElement.classList.add('dark')
      else document.documentElement.classList.remove('dark')
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export default themeSlice.reducer
