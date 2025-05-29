import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo veya Site Adı */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          İlayde Yücer | Biyolog | Biyoloji Öğretmeni
        </Link>

        {/* Menü Linkleri */}
        <nav className="flex space-x-6 text-sm font-medium text-gray-700">
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
            href="/musaitlik"
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
