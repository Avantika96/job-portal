import React from "react";
import s from "./Button.module.scss";

const Button = ({ title = "", handleClick, url = "" }) => {
  return (
    <button onClick={() => handleClick(url)} className={s.button}>
      {title}
    </button>
  );
};

export default Button;
