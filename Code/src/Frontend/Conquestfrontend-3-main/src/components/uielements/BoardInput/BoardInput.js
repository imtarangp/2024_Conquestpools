import React from "react";
import classes from "./style.module.css";
const BoardInput = ({ text, setText }) => {
  return (
    <div className={[classes["board-input-wrapper"]].join(" ")}>
      <input
        placeholder="Write Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default BoardInput;
