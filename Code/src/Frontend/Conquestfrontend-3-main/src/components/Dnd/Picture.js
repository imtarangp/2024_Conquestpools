import React from "react";
import { useDrag } from "react-dnd";
import classes from "./style.module.css";
const Picture = ({ src, id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor?.isDragging(),
    }),
  }));
  return (
    <img
      ref={drag}
      src={src}
      alt={id}
      style={{
        width: 100,
        marginRight: 15,
        border: isDragging ? "solid 5px pink" : "0px",
      }}
    />
  );
};

export default Picture;
