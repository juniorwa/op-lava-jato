import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex min-h-screen justify-center p-24">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <nav className="flex items-center">
            <Link href="/" className="mr-4 text-blue-500 hover:text-blue-700">
              Home
            </Link>
            <Link href="/admin" className="mr-4 text-blue-500 hover:text-blue-700">
              Admin
            </Link>
          </nav>
          <div className="flex items-center">
            <div className="mr-4">John Doe</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
