import { NavLink } from "react-router-dom"
import React from "react";
import { useLocation } from "react-router-dom";
import Logo from "../../Logo/Logo";
import { Home, Settings } from "lucide-react";

function Navbar() {

  const location = useLocation();
  const urlActive = location.pathname;
  console.log(urlActive);

  return (
    <header className="relative text-white shadow-md py-4 overflow-hidden bg-[#0B0B0B]">

      <div className="relative container mx-auto flex flex-col items-center z-10">
        <Logo />

        {/* menu de nav */}
        <nav className="flex space-x-12 text-md">
          <NavLink to="/app" className={`flex items-center gap-2 transition-all duration-200 ${urlActive === "/app" ? "animate-pulse text-[#28E1ED] font-bold" : "text-gray-400 hover:text-white"}`}> <Home size={24} />Feed</NavLink>
          <NavLink to="/app/settings" className={`flex item-center gap-2  transition-all duration-200 ${urlActive === "/app/settings" ? "animate-pulse text-[#28E1ED] font-bold" : "text-gray-400 hover:text-white"}`}> <Settings size={24} />Configuração</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
