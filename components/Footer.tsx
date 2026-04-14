import React from "react";

const Footer = () => {
  return (
    <footer className="py-12 px-8 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto flex justify-center">
        <p className="text-zinc-600 text-sm font-medium tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Safwan Nazir
        </p>
      </div>
    </footer>
  );
};

export default Footer;
