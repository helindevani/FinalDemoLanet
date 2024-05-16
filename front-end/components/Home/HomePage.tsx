import  background  from "../../public/Background.jpg";
import React from 'react';
import NotificationAlert from "./NotificationAlert";
import Image from "next/image";

const MainPage = () => {
  return (
    <>
    <div >
      <div className="top-[85px]">
        <NotificationAlert/>
        <Image src={background} alt="background" style={{ width: '100%', height:'100%' }} ></Image>
      </div>
    </div>
    </>
  );
};

export default MainPage;
