import React, { useEffect, useRef } from "react";
import classes from "./style.module.css";
import { useDrop } from "react-dnd";
import BoardInput from "../uielements/BoardInput/BoardInput";
const DeepBoard = ({
  deepBoard,
  setDeepBoard,
  buttonsListState,
  setButtonsListState,
  setDraggedButtonsId,
  board,
  setBoard,
  text,
  setText,
}) => {
  const addTileToDeepBoard = (id) => {
    const tempButtons = [...buttonsListState];
    const buttonIndex = buttonsListState?.findIndex((tile) => tile?.id === id);
    setDeepBoard((ps) => [...ps, tempButtons[buttonIndex]]);
    setButtonsListState(tempButtons);
    setDraggedButtonsId((ps) => [...ps, buttonIndex + 1]);
  };
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: ({ id, ...props }) => {
      getAllElementsCoordinates(deeepBoardRef.current.children);
      addTileToDeepBoard(id);
    },
    // collect: (monitor) => ({
    //   isOver: !!monitor?.isOver(),
    // }),
    collect: (monitor) => ({
      isOver: !!monitor?.isOver(),
    }),
  }));
  if (isOver) {
  }
  const deeepBoardRef = useRef(null);
  const getAllElementsCoordinates = (array) => {
    setBoard(array);
  };

  return (
    <div
      className={[classes["deep-board"], "col-12", "col-md-6"].join(" ")}
      ref={drop}
    >
      <div className="d-flex flex-wrap p-2" ref={deeepBoardRef}>
        {deepBoard?.map(({ id, value, type }) => {
          if (value === "Text")
            return <BoardInput key={id} text={text} setText={setText} />;
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
      <p className={classes["deep-board-placeholder"]}>Deep</p>
    </div>
  );
};

export default DeepBoard;
