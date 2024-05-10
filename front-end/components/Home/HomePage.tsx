import SendRequest from "../SendRequest";
import React from 'react';
import NotificationAlert from "./NotificationAlert";
import PersonalDetails from "../Connection/PersonalDetails";
import RequieredDocument from "../Connection/RequieredDocument";
import OtherDetails from "../Connection/OtherDetails";
import Declaration from "../Connection/Declaration";
import ConnectionHeader from "../Connection/Connection";
import Connection from "../Connection/Connection";

const MainPage = () => {



  
  return (
    <>
    <div className="p-4">
      <div className="mb-4">
        <NotificationAlert/>
        <SendRequest/>
        <Connection/>
      </div>
    </div>
    </>
  );
};

export default MainPage;
