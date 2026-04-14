"use client";

import React from "react";
import { Menu } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference">
      <div className="text-xl font-medium tracking-tighter text-white">
        SN
      </div>
      <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group">
        <Menu className="w-5 h-5" />
        <span className="text-sm font-medium uppercase tracking-widest">Menu</span>
      </button>
    </nav>
  );
};

export default NavBar;
