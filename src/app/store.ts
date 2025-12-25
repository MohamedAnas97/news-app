import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice'
import languageReducer from '../features/language/languageSlice'
import { newsApi } from '../features/news/newsApi'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(newsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
