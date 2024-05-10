'use client';
import { useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";


type Message = {
  sender: string;
  content: string;
  sentTime: Date;
};

const NotificationAlert = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const connect = new HubConnectionBuilder()
        .withUrl("http://localhost:5057/NotiFiy")
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Information)
        .build();
    setConnection(connect);
}, []);

useEffect(() => {
    if (!connection) return; 
    connection.start()
        .then(() => {
            console.log("SignalR connection established successfully.");
            connection.on("SendMessage", (notification) => {
                console.log(notification);
                alert(notification);
            });
            // connection.invoke("RetrieveMessageHistory");
        })
        .catch((err) => console.error("Error while connecting to SignalR Hub:", err));

    return () => {
        if (connection) {
            connection.off("SendMessage");
        }
    };
}, [connection]);


  return (
    <>
    </>
  );
};

export default NotificationAlert;
