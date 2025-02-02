import React from "react";

// Style
import "./Option.css";

// Assets
import selectedOption from "../../assets/selectedOption.svg";
import option from "../../assets/option.svg";


const Option = ({ id, text, selected, onSelectAction }) => {
  return (
    <div
      className={`option_wrap ${selected ? "option_wrap_selected" : ""}`}
      onClick={() => {
        onSelectAction(id);
      }}
    >
      <img
        src={selected ? selectedOption : option}
        alt={`option-select-${id}`}
        className="option_svg"
      />
      <div className={"option_text"}>{text}</div>
    </div>
  );
};

export default Option;
