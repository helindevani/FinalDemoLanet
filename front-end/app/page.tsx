import React from "react";
import GasAgencyBanner from "@/components/Home/GasBanner";
import Services from "@/components/Home/Services";
import AboutUs from "@/components/Home/AboutUs";
import Gallery from "@/components/Home/Gallery";
import ContactUs from "@/components/Home/ContactUs";
import WhyUs from "@/components/Home/WhyUs";
import Testimonials from "@/components/Home/Testimonial";
import Footer from "@/components/Layout/Footer";

export default function Home() {
  return (
    <div className="top-[80px]">
      <div id="home">
        <GasAgencyBanner />
        <div id="services">
          <Services />
        </div>
        <div id="about">
          <AboutUs />
        </div>
        <div id="gallery">
          <Gallery />
        </div>
        <div id="whyus">
          <WhyUs />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="contact">
          <ContactUs />
        </div>
      </div>
      <Footer />
    </div>
  );
}
