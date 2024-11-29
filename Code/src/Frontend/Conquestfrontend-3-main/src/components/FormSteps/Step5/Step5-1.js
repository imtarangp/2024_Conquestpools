import React, { useState, useCallback } from "react";
import { Container } from "./Container.js";
import DragDrop from "../../Dnd/DragDrop";
import BackButton from "../../uielements/BackButton/BackButton";
import SubmitButton from "../../uielements/SubmitButton/SubmitButton";
import { useDispatch } from "react-redux";
import {
  submitDiagramStartAsync,
  submitFinalBoardStartAsync,
} from "../../../store/actions/finalStep";
const Step5 = ({ setCurrStep }) => {
  const dispatch = useDispatch();
  const [deepBoard, setDeepBoard] = useState([]);
  const [shallowBoard, setShallowBoard] = useState([]);
  const [draggedButtonsId, setDraggedButtonsId] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [board, setBoard] = useState([]);
  const [shallowFinal, setShallowFinal] = useState([]);
  const [text, setText] = useState("");
  const [finalAllBoards, setFinalAllBoards] = useState([]);
  const viewBoard = () => {
    const merged = [];
    for (let i = 0; i < board.length; i++) {
      const element = board[i].getBoundingClientRect();
      merged.push({
        x: element.x,
        y: element.y,
        height: element.height,
        width: element.width,
        itemName: !board[i].children.length ? board[i].innerHTML : "Text",
        description: !board[i].children.length
          ? `Deep Board: `
          : `Deep Board:${board[i].children[0].value}`,
        itemStroke: "",
        itemStrokeThickness: 0,
        itemFill: "",
        itemFont: 0,
        itemWeight: "",
        zOrder: 0,
        dataType: "",
        itemLineType: "",
        x2: 0,
        y2: 0,
        itemTop: 0,
      });
    }
    for (let i = 0; i < shallowFinal.length; i++) {
      const element = shallowFinal[i].getBoundingClientRect();
      merged.push({
        x: element.x,
        y: element.y,
        height: element.height,
        width: element.width,
        itemName: !shallowFinal[i].children.length
          ? shallowFinal[i].innerHTML
          : "Text",
        description: !shallowFinal[i].children.length
          ? `Shallow Board: `
          : `Shallow Board: ${shallowFinal[i].children[0].value}`,
        itemStroke: "",
        itemStrokeThickness: 0,
        itemFill: "",
        itemFont: 0,
        itemWeight: "",
        zOrder: 0,
        dataType: "",
        itemLineType: "",
        x2: 0,
        y2: 0,
        itemTop: 0,
      });
    }
    const finalMerged = [];

    for (let i = 0; i < merged.length; i++) {
      const element = merged[i];
      finalMerged.push({
        ...element,
        itemLeft: i,
      });
    }
    setFinalAllBoards(finalMerged);
    dispatch(submitFinalBoardStartAsync(finalMerged));
  };
  const handleSubmit = async () => {
    // setCurrStep((ps) => ps + 1);
    viewBoard();
    const tempArr = [];
    if (deepBoard.length) {
      for (let index = 0; index < deepBoard.length; index++) {
        const element = deepBoard[index];
        tempArr.push({
          value: element.value,
          description: "deep",
        });
      }
    }
    if (shallowBoard.length) {
      for (let index = 0; index < shallowBoard.length; index++) {
        const element = shallowBoard[index];
        tempArr.push({
          value: element.value,
          description: "shallow",
        });
      }
    }

    dispatch(submitDiagramStartAsync(tempArr, setCurrStep));
  };
  const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true);
  const toggle = useCallback(
    () => setHideSourceOnDrag(!hideSourceOnDrag),
    [hideSourceOnDrag]
  );
  return (
    <>
      <Container
        hideSourceOnDrag={hideSourceOnDrag}
        setCurrStep={setCurrStep}
      />
      <div>
        <div></div>
      </div>
      <div className="d-flex flex-column" style={{ flex: 1 }}>
        {/* <DragDrop
          text={text}
          setText={setText}
          board={board}
          setBoard={setBoard}
          shallowFinal={shallowFinal}
          setShallowFinal={setShallowFinal}
          deepBoard={deepBoard}
          setDeepBoard={setDeepBoard}
          shallowBoard={shallowBoard}
          setShallowBoard={setShallowBoard}
          draggedButtonsId={draggedButtonsId}
          setDraggedButtonsId={setDraggedButtonsId}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        /> */}
        {/* <div
          style={{ flex: 1 }}
          className="d-flex mt-5 justify-content-between align-items-end"
        >
          <div>
            <BackButton setCurrStep={setCurrStep} />
          </div>
          <div>
            <SubmitButton
              next
              handleSubmit={handleSubmit}
              type="button"
              setCurrStep={setCurrStep}
            />
          </div>
        </div> */}
      </div>
      {/* <Stage
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={1600}
        height={700}
        // width={100}
        // height={100}
      >
        <Layer>
          <Arrow points={[997, 475, 1097, 475]} fill="black" stroke="black" />
        </Layer>
      </Stage> */}
    </>
  );
};

export default Step5;
