import React, { useState, useRef } from "react";
import s from "./TagInput.module.scss";
import { Tag } from "../";

const TagInput = ({}) => {
  const [tags, setTags] = useState([]);
  const tagInput = useRef(null);

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
        return;
      }
      setTags([...tags, val]);
      tagInput.current.value = null;
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div className={s.input}>
      <ul className={s.input__tags}>
        {tags.map((tag, i) => (
          <li key={tag}>
            <Tag name={tag} handleCross={() => removeTag(i)} withCross />
          </li>
        ))}
        <li className={s.input__tags__input}>
          <input
            type="text"
            onKeyDown={inputKeyDown}
            ref={tagInput}
            placeholder="Enter Skills"
          />
        </li>
      </ul>
    </div>
  );
};

export default TagInput;
