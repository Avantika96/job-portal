import React from "react";
import s from "./Tag.module.scss";

const Tag = ({ name = "" }) => {
  return <span className={s.tag}>{name}</span>;
};

export default Tag;
