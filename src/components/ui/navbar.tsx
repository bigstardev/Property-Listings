import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 bg-gray-800 z-50 p-4">
      <div className="text-white font-bold text-3xl">
        <Link href="/">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;
