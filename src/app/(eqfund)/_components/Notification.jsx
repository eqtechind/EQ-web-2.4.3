import React from "react";
import NotificationCard from "./NotificationCard";

const Notification = () => {
  return (
    <div className="w-[30vh] h-full relative z-100 p-2 min-h-[90vh] mb-5 bg-slate-400 bg-opacity-50">
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
    </div>
  );
};

export default Notification;
