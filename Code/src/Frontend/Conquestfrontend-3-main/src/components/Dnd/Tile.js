import React from "react";
import classes from "./style.module.css";
import { useDrag } from "react-dnd";
const Tile = ({ children, id, isChecked }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    // collect: (monitor) => ({
    //   isDragging: !!monitor?.isDragging(),
    // }),
    collect: (monitor) => ({
      isDragging: !!monitor?.isDragging(),
    }),
  }));
  if (isDragging) {
  }
  return (
    <div
      ref={isChecked ? drag : null}
      className={isChecked ? classes["tile"] : classes["disabled-tile"]}
    >
      {children}
    </div>
  );
};

export default Tile;
