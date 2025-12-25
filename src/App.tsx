import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { setTheme } from "./features/theme/themeSlice";
import Header from "./shared/layout/Header";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    dispatch(setTheme(storedTheme || "light"));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}
