import UploadNotification from "../business/UploadNotification";
import ResetInventoryNotification from "../notifications/ResetInventoryNotification";
import ErrorNotification from "../notifications/ErrorNotification";
import ProfileUpdatedNotifcation from "../notifications/ProfileUpdatedNotification";
import SubscribedNotification from "../notifications/SubscribedNotification";
import SubscriptionResumedNotification from "../notifications/SubscriptionResumedNotification";
import SubscriptionCanceledNotification from "../notifications/SubscriptionCanceledNotification";
import { useState, useEffect } from "react";

const NotificationContainer = ({
  notifications,
  setNotifications,
  type,
  setType,
}) => {
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(notifications.slice(1));
        if (setType) {
          setType(null);
        }
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

  if (type === "error") {
    return (
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map((notification, index) => (
          <ErrorNotification key={index} message={notification} />
        ))}
      </div>
    );
  }

  if (type === "subscribed") {
  }

  if (type === "resumed subscription") {
    return (
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map((notification, index) => (
          <SubscriptionResumedNotification key={index} message={notification} />
        ))}
      </div>
    );
  }

  if (type === "canceled subscription") {
    return (
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map((notification, index) => (
          <SubscriptionCanceledNotification
            key={index}
            message={notification}
          />
        ))}
      </div>
    );
  }

  if (type === "profile updated") {
    return (
      <div className="fixed bottom-4 right-4 space-y-2">
        {notifications.map((notification, index) => (
          <ProfileUpdatedNotifcation key={index} message={notification} />
        ))}
      </div>
    );
  }
};

export default NotificationContainer;
