import Link from "next/link";
import React from "react";
import MenuSheet from "./_components/MenuSheet";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-8  shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo veya Site Adı */}
        <Link href="/" className="text-xl font-bold ">
          İlayde Yücer | Biyolog | Biyoloji Öğretmeni
        </Link>

        {/* Menü Linkleri */}
        <nav className="hidden md:flex space-x-6  font-bold  ">
          <Link
            href="/"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Anasayfa
          </Link>
          <Link
            href="/lessonsandservices"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Dersler & Hizmetler
          </Link>
          <Link
            href="/availability"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Müsaitlik
          </Link>
          <Link
            href="/blog"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            href="/aboutme"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Hakkımda
          </Link>
        </nav>
        <MenuSheet />
      </div>
    </header>
  );
};

export default Header;
