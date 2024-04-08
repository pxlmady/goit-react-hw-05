import React from "react";
import css from "./Feedback.module.css";

function Feedback({ guestOpinion, total, positive }) {
  return (
    <div>
      <ul className={css.feedbackList}>
        <li>Good:{guestOpinion.good}</li>
        <li>Neutral:{guestOpinion.neutral}</li>
        <li>Bad:{guestOpinion.bad}</li>
        <li>Total:{total}</li>
        <li>Positive:{positive}%</li>
      </ul>
    </div>
  );
}

export default Feedback;
