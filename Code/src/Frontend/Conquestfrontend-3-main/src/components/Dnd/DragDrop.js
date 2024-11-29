import React, { useEffect, useState } from "react";
import classes from "./style.module.css";
import Tile from "./Tile";
import ShallowBoard from "./ShallowBoard";
import DeepBoard from "./DeepBoard";
const DragDrop = ({
  deepBoard,
  setDeepBoard,
  shallowBoard,
  setShallowBoard,
  draggedButtonsId,
  setDraggedButtonsId,
  isChecked,
  setIsChecked,
  board,
  setBoard,
  shallowFinal,
  setShallowFinal,
  text,
  setText,
}) => {
  const buttonsList = [
    {
      id: 1,
      value: "X",
      type: "button",
      isDragged: false,
    },
    {
      id: 2,
      value: "P",
      type: "button",
      isDragged: false,
    },
    {
      id: 3,
      value: "T",
      type: "button",
      isDragged: false,
    },
    {
      id: 4,
      value: "W/D",
      type: "button",
      isDragged: false,
    },
    {
      id: 5,
      value: "JETS",
      type: "button",
      isDragged: false,
    },
    {
      id: 6,
      value: "S/P",
      type: "button",
      isDragged: false,
    },
    {
      id: 7,
      value: "Lights",
      type: "button",
      isDragged: false,
    },
    {
      id: 8,
      value: "Arrow",
      type: "button",
      isDragged: false,
    },
    {
      id: 9,
      value: "Text",
      type: "text",
      isDragged: false,
    },
  ];
  const [buttonsListState, setButtonsListState] = useState(buttonsList);
  // const [board, setBoard] = useState([]);
  const handleReset = () => {
    setText("");
    setDeepBoard([]);
    setShallowBoard([]);
    setDraggedButtonsId([]);
  };

  return (
    <>
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <div className="d-flex align-items-center col-2">
            <div className="d-flex">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => setIsChecked((ps) => !ps)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="mx-2">
              <p className={["mb-0", classes["label"]].join(" ")}>Edit Mode</p>
            </div>
          </div>
          <div className="d-flex col-10">
            {buttonsListState?.map(({ id, type, value, isDragged }) => {
              if (draggedButtonsId.includes(id))
                return (
                  <div
                    className={classes["dragged-tile"]}
                    id={id}
                    key={id}
                    value={value}
                    type={type}
                  >
                    {value}
                  </div>
                );
              return (
                <Tile id={id} key={id} isChecked={isChecked}>
                  {value}
                </Tile>
              );
            })}
            <div onClick={handleReset} className={classes["reset-button"]}>
              Reset
            </div>
          </div>
        </div>
        <div className="col-11 offset-1">
          <div className="d-flex">
            <DeepBoard
              text={text}
              setText={setText}
              board={board}
              setBoard={setBoard}
              deepBoard={deepBoard}
              setDeepBoard={setDeepBoard}
              buttonsListState={buttonsListState}
              setButtonsListState={setButtonsListState}
              setDraggedButtonsId={setDraggedButtonsId}
            />
            <ShallowBoard
              text={text}
              setText={setText}
              shallowFinal={shallowFinal}
              setShallowFinal={setShallowFinal}
              board={board}
              setBoard={setBoard}
              shallowBoard={shallowBoard}
              setShallowBoard={setShallowBoard}
              buttonsListState={buttonsListState}
              setButtonsListState={setButtonsListState}
              setDraggedButtonsId={setDraggedButtonsId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DragDrop;
