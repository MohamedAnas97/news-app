import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import { setTheme } from "./features/theme/themeSlice";
import Header from "./shared/layout/Header";
import Footer from "./shared/layout/Footer";
import NewsList from "./pages/NewsPage";
import PostDetailsPage from "./pages/PostDetailsPage";
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
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/post/:id" element={<PostDetailsPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
