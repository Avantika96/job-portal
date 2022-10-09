import React from "react";
import s from "./Tag.module.scss";

const Tag = ({ name = "", withCross = false, handleCross = () => {} }) => {
  return (
    <div className={s.tag}>
      {withCross && (
        <button className={s.tag__cross} type="button" onClick={handleCross}>
          +
        </button>
      )}
      <span className={s.tag__text}>{name}</span>
    </div>
  );
};

export default Tag;
