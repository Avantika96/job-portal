import React from "react";
import s from "./Button.module.scss";

const Button = ({
  text = "",
  handleClick,
  url = "",
  customStyle = {},
  disabled = false,
}) => {
  console.log(disabled);
  return (
    <button
      onClick={() => handleClick(url)}
      className={disabled ? `${s.button} ${s.button__disabled}` : s.button}
      style={customStyle}
    >
      {text}
    </button>
  );
};

export default Button;
