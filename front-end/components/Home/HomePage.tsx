import  background  from "../../public/Background.jpg";
import React from 'react';
import NotificationAlert from "./NotificationAlert";
import Image from "next/image";
import Footer from "../Layout/Footer";
import ProfileView from "../Items/Profile";

const MainPage = () => {
  return (
    <>
    <div >
      <div className="top-[85px]">
        <NotificationAlert/>
        <Image src={background} alt="background" style={{ width: '100%', height:'100%' }} ></Image>
        <ProfileView/>
      </div>
      <Footer/>
    </div>
    </>
  );
};

export default MainPage;
