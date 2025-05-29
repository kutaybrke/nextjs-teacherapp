"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useHomeStore from "@/stores/useHomeStore";
import Image from "next/image";

const FeaturedSubject = () => {
  const { testimonials } = useHomeStore((state) => state.homeContent);

  return (
    <div>
      <h1 className="text-center text-4xl md:text-5xl font-bold text-blue-800">
        Yorumlar
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-5">
        {testimonials.map((t) => (
          <Card
            key={t.id}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              {t.avatar && (
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <CardTitle className="text-base">{t.name}</CardTitle>
                <CardDescription className="text-sm">
                  {t.relation}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="italic text-gray-700">“{t.quote}”</p>
            </CardContent>
            <CardFooter>
              <p className="text-yellow-500 text-sm">
                {"⭐".repeat(t.rating)}{" "}
                <span className="text-gray-400 ml-2">{t.rating}/5</span>
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSubject;
