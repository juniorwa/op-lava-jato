import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex justify-center p-10">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between">
          <nav className="flex items-center">
            <Link href="/booking" className="mr-4 text-blue-500 hover:text-blue-700">
              Booking
            </Link>

            <Link
              href="/signup"
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              SignUp
            </Link>

            <Link
              href="/admin"
              className="mr-4 text-blue-500 hover:text-blue-700"
            >
              Admin
            </Link>
          </nav>
          <div className="flex items-center">
            <div className="mr-4">LOGO</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
