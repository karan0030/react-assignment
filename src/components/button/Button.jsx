import React from "react";

import "./Button.css";

const Button = ({ text, action, className, icon, disabled }) => {
  return (
    <button
      className={`button-default ${className}`}
      onClick={action}
      disabled={disabled}
    >
      {text}
      {icon && (
        <span>
          <img src={icon} alt={`button-icon`} className="button-icon" />
        </span>
      )}
    </button>
  );
};

export default Button;
