import React from "react";
import css from "./Options.module.css";

function Options({ totalFeedbackNumber, updateFeedback, onResetButtonClick }) {
  return (
    <div>
      <ul className={css.buttonList}>
        <li>
          <button
            className={css.optionButton}
            type="button"
            onClick={() => updateFeedback("good")}>
            Good
          </button>
        </li>
        <li>
          <button
            className={css.optionButton}
            type="button"
            onClick={() => updateFeedback("neutral")}>
            Neutral
          </button>
        </li>
        <li>
          <button
            className={css.optionButton}
            type="button"
            onClick={() => updateFeedback("bad")}>
            Bad
          </button>
        </li>
        {totalFeedbackNumber === 0 ? null : (
          <li>
            <button
              className={css.optionButton}
              type="button"
              onClick={onResetButtonClick}>
              Reset
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Options;
