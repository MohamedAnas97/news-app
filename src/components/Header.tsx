import { FiMoon, FiZap } from "react-icons/fi";
export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-4 border-b transition-colors duration-300">
      <h1 className="font-bold text-xl bg-gradient-to-r from-[#50e5b0] to-[#0172a7] bg-clip-text text-transparent">
        News App
      </h1>
      <div className="flex items-center gap-4">
        <button className="w-10 h-5 flex items-center rounded-full p-1 transition-all duration-300 cursor-pointer">
          <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center">
            <FiMoon size={12} color="#0172a7" />
            <FiZap size={12} color="#50e5b0" />
          </div>
        </button>
        <select
          className="
            px-2 py-1 text-xs font-medium rounded cursor-pointer transition-colors duration-300 appearance-none outline-none"
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
      </div>
    </header>
  );
}
