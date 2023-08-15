import UploadNotification from "../business/UploadNotification";
import ResetInventoryNotification from "../notifications/ResetInventoryNotification";
import { useState, useEffect } from "react";

const NotificationContainer = ({ notifications, setNotifications, type }) => {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(notifications.slice(1));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  if (type === "upload") {
    return (
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map((notification, index) => (
          <UploadNotification key={index} {...notification} />
        ))}
      </div>
    );
  }

  if (type === "reset inventory") {
    return (
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map((notification, index) => (
          <ResetInventoryNotification key={index} />
        ))}
      </div>
    );
  }
};

export default NotificationContainer;
