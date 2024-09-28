import React from "react";

// Style
import "./ResultOutput.css";

const ResultOutput = ({ count, isCorrect }) => {
  return (
    <div
      className={`result_output_wrap ${
        isCorrect ? "result_output_correct" : "result_output_incorrect"
      }`}
    >
      <div className="result_count">
        <div
          className={`result_circle ${
            isCorrect ? "result_circle_correct" : "result_circle_incorrect"
          }`}
        ></div>
        {count}
        <span className={"result_text"}>
          {isCorrect ? "Correct" : "Incorect"}
        </span>
      </div>
    </div>
  );
};

export default ResultOutput;
