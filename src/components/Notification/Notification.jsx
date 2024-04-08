import React from "react";
import css from "./Notification.module.css";
function Notification() {
  return (
    <div>
      <p className={css.noFeedbackNotification}>No feedback yet</p>
    </div>
  );
}

export default Notification;
