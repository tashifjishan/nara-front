import React, { useState } from "react";
import TopSection from "../components/home/TopSection";
import Navbar from "../components/Navbar/Navbar";
import BehindTheScreen from "../components/home/BehindTheScreen";
import Spotlight from "../components/home/Spotlight";
import MidSection from "../components/home/MidSection";
import FooterSection from "../components/home/FooterSection";
import SubscribeSection from "../components/home/SubscribeSection";

const Home = () => {
  return (
    <div className="dark:!bg-black ">
      <Navbar />
      <TopSection />
      <BehindTheScreen />
      <Spotlight />
      {/* <MidSection /> */}
      <SubscribeSection />
      <FooterSection />
    </div>
  );
};

export default Home;
