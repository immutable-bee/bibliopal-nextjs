import UploadNotification from "../business/UploadNotification";

import { useState, useEffect } from "react";

const NotificationContainer = ({ notifications, setNotifications }) => {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(notifications.slice(1));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {notifications.map((notification, index) => (
        <UploadNotification key={index} {...notification} />
      ))}
    </div>
  );
};

export default NotificationContainer;
