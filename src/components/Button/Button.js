import React from "react";
import s from "./Button.module.scss";

const Button = ({
  text = "",
  handleClick = () => {},
  url = "",
  customStyle = {},
  disabled = false,
  type = "",
}) => {
  return (
    <button
      type={type}
      onClick={() => handleClick(url ? url : null)}
      className={disabled ? `${s.button} ${s.button__disabled}` : s.button}
      style={customStyle}
    >
      {text}
    </button>
  );
};

export default Button;
