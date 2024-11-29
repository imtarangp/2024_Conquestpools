import React, { useEffect, useRef } from "react";
import classes from "./style.module.css";
import { useDrop } from "react-dnd";
import BoardInput from "../uielements/BoardInput/BoardInput";
const ShallowBoard = ({
  shallowBoard,
  setShallowBoard,
  buttonsListState,
  setButtonsListState,
  setDraggedButtonsId,
  shallowFinal,
  setShallowFinal,
  text,
  setText,
}) => {
  const addTileToShallowBoard = (id) => {
    const tempButtons = [...buttonsListState];
    const buttonIndex = buttonsListState?.findIndex((tile) => tile?.id === id);
    setShallowBoard((ps) => [...ps, tempButtons[buttonIndex]]);
    setButtonsListState(tempButtons);
    setDraggedButtonsId((ps) => [...ps, buttonIndex + 1]);
  };
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: ({ id }) => {
      getAllElementsCoordinates(shallowBoardRef.current.children);
      addTileToShallowBoard(id);
    },
    collect: (monitor) => ({
      isOver: !!monitor?.isOver(),
    }),
  }));
  if (isOver) {
  }
  const shallowBoardRef = useRef(null);
  const getAllElementsCoordinates = (array) => {
    setShallowFinal(array);
  };
  return (
    <div
      className={[classes["shallow-board"], "col-12", "col-md-6"].join(" ")}
      ref={drop}
    >
      <div className="d-flex flex-wrap p-2" ref={shallowBoardRef}>
        {shallowBoard?.map(({ id, value, type }) => {
          if (value === "Text")
            return (
              // <div key={id}>
              //   <input value={text} onChange={(e) => setText(e.target.value)} />
              // </div>
              <BoardInput key={id} text={text} setText={setText} />
            );
          else
            return (
              <div
                className={[classes["tile"], "mb-2"].join(" ")}
                id={id}
                key={id}
                value={value}
                type={type}
              >
                {value}
              </div>
            );
        })}
      </div>
      <p className={classes["shallow-board-placeholder"]}>Shallow</p>
    </div>
  );
};

export default ShallowBoard;
