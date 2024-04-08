import React, { useEffect, useState } from "react";
import "./App.css";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";

function App() {
  const STORAGE_KEY = "feedbackData";

  const [guestOpinion, setguestOpinion] = useState(() => {
    const initialData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return initialData ?? { good: 0, neutral: 0, bad: 0 };
  });

  const updateFeedback = (feedbackType) => {
    setguestOpinion((prevOpinion) => ({
      ...prevOpinion,
      [feedbackType]: prevOpinion[feedbackType] + 1,
    }));
  };

  const totalFeedback =
    guestOpinion.good + guestOpinion.bad + guestOpinion.neutral;

  const percentOfPositiveFeedback = Math.round(
    ((guestOpinion.good + guestOpinion.neutral) / totalFeedback) * 100
  );

  const handleResetButtonClick = () => {
    setguestOpinion({ good: 0, neutral: 0, bad: 0 });
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(guestOpinion));
  }, [guestOpinion]);

  return (
    <div className="cafePlace">
      <Description />
      <Options
        updateFeedback={updateFeedback}
        totalFeedbackNumber={totalFeedback}
        onResetButtonClick={handleResetButtonClick}
      />
      {totalFeedback === 0 ? (
        <Notification />
      ) : (
        <Feedback
          guestOpinion={guestOpinion}
          total={totalFeedback}
          positive={percentOfPositiveFeedback}
        />
      )}
    </div>
  );
}

export default App;
