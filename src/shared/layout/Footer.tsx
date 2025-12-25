import { useAppSelector } from "../../app/hooks";
import { Link } from "react-router-dom";
import { translations } from "../../language/translations";
import type { Lang } from "../../language/translations";

export default function Footer() {
  const lang = useAppSelector((state) => state.language.lang) as Lang;
  const theme = useAppSelector((state) => state.theme.mode);
  const isRTL = lang === "ar";

  return (
    <footer
      className={`w-full ${
        theme === "dark"
          ? "bg-gray-900 border-t border-gray-700"
          : "bg-[#224c63]"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="px-4 lg:px-16 py-6 flex flex-row md:items-center justify-between gap-4">
        {/* footer logo name  */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="font-bold text-xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300"
          >
            {translations[lang].appName}
          </Link>
        </div>
        {/* footer copy right */}
        <p
          className={`text-[12px] mt-2 md:mt-0 ${
            theme === "dark" ? "text-gray-400" : "text-gray-200"
          }`}
        >
          &copy; {new Date().getFullYear()} {translations[lang].appName}.
        </p>
      </div>
    </footer>
  );
}
