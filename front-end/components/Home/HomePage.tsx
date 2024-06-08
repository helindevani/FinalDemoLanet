import  background  from "../../public/Background.jpg";
import React from 'react';
import Image from "next/image";
import Footer from "../Layout/Footer";
import ProfileView from "../Profile/Profile";
import Services from "./Services";
import AboutUs from "./AboutUs";
import Gallery from "./Gallery";
import Testimonials from "./Testimonial";
import ContactUs from "./ContactUs";
import GasAgencyBanner from "./GasBanner";
import WhyUs from "./WhyUs";


const MainPage = () => {
  return (
    <>
    <div >
      <div className="top-[80px]">
        <GasAgencyBanner/>
        <Services/>
        <AboutUs/>
        <Gallery/>
        <WhyUs/>
        <Testimonials/>
        <ContactUs/>
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default MainPage;
