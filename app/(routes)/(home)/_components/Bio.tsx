// components/HomeIntro.tsx
"use client";

import useHomeStore from "@/stores/useHomeStore";
import { useEffect } from "react";
import { homeContent as mockData } from "@/data/homeContent";
import Image from "next/image";

export default function HomeIntro() {
  const { homeContent, setHomeContent } = useHomeStore();

  useEffect(() => {
    setHomeContent(mockData);
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Section */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
            {homeContent.welcomeMessage}
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-xl">
            {homeContent.bio}
          </p>
          <button className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-6 rounded-full transition-all shadow-md">
            İletişime Geç
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center md:justify-end">
          <Image
            src="/banner.png"
            alt="Öğretmen Banner"
            width={400}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
