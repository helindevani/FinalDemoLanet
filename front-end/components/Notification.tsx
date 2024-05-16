import React, { useState, useEffect, useRef } from "react";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(3);
  const [showUnreadHighlight, setShowUnreadHighlight] = useState<boolean>(true);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        // Clicked outside the Notification component
        setShowUnreadHighlight(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5057/DatabaseContext/notificationHub") // URL to your SignalR hub
      .build();

    hubConnection.start()
      .then(() => console.log("SignalR connection established."))
      .catch(err => console.error("Error establishing SignalR connection:", err));

    // Define event handlers for incoming notifications
    hubConnection.on("ReceiveNotification", (message: string) => {
      setNotifications(prevNotifications => [...prevNotifications, message]);
    });

    // Clean up event handlers on component unmount
    return () => {
      hubConnection.off("ReceiveNotification");
      hubConnection.stop();
    };
    console.log(hubConnection)
  }, []);

  const markAllAsRead = () => {
    setUnreadCount(0);
    setShowUnreadHighlight(false);
  };

  const handleAllClick = () => {
    setShowUnreadHighlight(false);
    // Add your logic here to fetch all notifications
  };

  const handleUnreadClick = () => {
    setShowUnreadHighlight(true);
    // Add your logic here to fetch only unread notifications
  };

  const handleCloseClick = () => {
    setShowUnreadHighlight(false);
  };

  return (

    <aside
      ref={notificationRef}
      id="notification-sidebar"
      className={`fixed top-0 right-0 z-50 h-screen transition-transform translate-x-full sm:translate-x-0 flex-col-2 w-64 bg-gray-50 dark:bg-gray-800 ${showUnreadHighlight ? "block" : "hidden"}`}
      aria-label="Notification Sidebar"
    >
      <div className="h-full px-3 py-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button
            className="text-gray-600 dark:text-gray-400"
            onClick={handleCloseClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <div
            className={`cursor-pointer ${showUnreadHighlight ? "font-semibold" : ""}`}
            onClick={handleUnreadClick}
          >
            Unread ({unreadCount})
          </div>
          <div
            className={`cursor-pointer ${!showUnreadHighlight ? "font-semibold" : ""}`}
            onClick={handleAllClick}
          >
            All
          </div>
        </div>
        <div className="notification-content">
         
          {showUnreadHighlight && (
            <div className="notification-item unread">Notification 1</div>
          )}
          <div className="notification-item">Notification 2</div>
          <div className="notification-item">Notification 3</div>
        </div>
        <div className="notification-actions">
          <button onClick={markAllAsRead}>Mark All as Read</button>
        </div>
      </div>
    </aside>   
  );
};

export default Notification;

