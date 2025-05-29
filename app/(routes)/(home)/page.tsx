import React from "react";
import HomeIntro from "./_components/Bio";
import FeaturedSubject from "./_components/FeaturedSubject";

const HomePage = () => {
  return (
    <div className="space-y-3">
      <HomeIntro />
      <FeaturedSubject />
    </div>
  );
};

export default HomePage;
