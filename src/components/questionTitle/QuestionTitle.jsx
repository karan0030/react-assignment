import React from "react";

// Style
import "./QuestionTitle.css";

const QuestionTitle = ({ title, className }) => {
  return <div className={`question_title ${className}`}>{title}</div>;
};

export default QuestionTitle;
