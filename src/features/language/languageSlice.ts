import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Lang = "en" | "ar";
const initial: Lang = (localStorage.getItem("lang") as Lang) || "en";
const languageSlice = createSlice({
  name: "language",
  initialState: { lang: initial },
  reducers: {
    toggleLanguage: (state) => {
      state.lang = state.lang === "en" ? "ar" : "en";
      localStorage.setItem("lang", state.lang);
      document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = state.lang;
    },
    setLanguage: (state, action: PayloadAction<Lang>) => {
      state.lang = action.payload;
      localStorage.setItem("lang", state.lang);
      document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = state.lang;
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
