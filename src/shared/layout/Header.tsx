import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleTheme } from "../../features/theme/themeSlice";
import { setLanguage } from "../../features/language/languageSlice";
import { translations } from "../../language/translations";
import type { Lang } from "../../language/translations";
import { FiMoon, FiZap } from "react-icons/fi";

export default function Header() {
  const dispatch = useAppDispatch();
  const lang = useAppSelector((state) => state.language.lang) as Lang;
  const theme = useAppSelector((state) => state.theme.mode);
  const isRTL = lang === "ar";
  return (
    <header
      className={`w-full ${
        theme === "dark"
          ? "bg-slate-900 border-slate-700"
          : "bg-white border-[#d9eaf3]"
      } border-b`}
    >
      <div
        className="px-4 lg:px-16 flex items-center justify-between py-4"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* logo app name */}
        <Link
          to="/"
          className="font-bold text-xl bg-gradient-to-r from-[#50e5b0] to-[#0172a7] bg-clip-text text-transparent"
        >
          {translations[lang].appName ?? "News"}
        </Link>
        <div
          className={`flex items-center gap-4 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {/* theme toggle dark and light */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`w-10 h-5 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer ${
              theme === "dark" ? "bg-[#0172a7]" : "bg-[#50e5b0]"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
                ${
                  theme === "dark"
                    ? isRTL
                      ? "translate-x-[-20px]"
                      : "translate-x-[20px]"
                    : "translate-x-0"
                }
              `}
            >
              {theme === "dark" ? (
                <FiMoon size={12} color="#0172a7" />
              ) : (
                <FiZap size={12} color="#50e5b0" />
              )}
            </div>
          </button>
          {/* language select option en and ar */}
          <select
            value={lang}
            onChange={(e) => dispatch(setLanguage(e.target.value as Lang))}
            className={`
              px-2 py-1 text-sm font-semibold rounded cursor-pointer transition-colors duration-300 appearance-none outline-none
              ${
                theme === "dark"
                  ? "bg-slate-800 text-white border-none"
                  : "bg-white text-[#0172a7] border-none"
              }
            `}
          >
            <option value="en" className="font-semibold text-xs">EN</option>
            <option value="ar" className="font-semibold text-xs">AR</option>
          </select>
        </div>
      </div>
    </header>
  );
}
