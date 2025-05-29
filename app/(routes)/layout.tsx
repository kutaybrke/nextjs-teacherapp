import Footer from "@/components/sections/footer/Footer";
import Header from "@/components/sections/header/Header";
import React from "react";

interface RouteLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: RouteLayoutProps) => {
  return (
    <div>
      <Header />
      <main className="min-h-screen mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
