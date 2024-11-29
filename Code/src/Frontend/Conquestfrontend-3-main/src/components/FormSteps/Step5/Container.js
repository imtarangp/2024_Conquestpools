import update from "immutability-helper";
import { useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { submitDiagramStartAsync } from "../../../store/actions/finalStep";
import BackButton from "../../uielements/BackButton/BackButton";
import SubmitButton from "../../uielements/SubmitButton/SubmitButton";
import { Box } from "./Box.js";
import { ItemTypes } from "./ItemTypes.js";
import classes from "./style.module.css";
const styles = {
  width: 800,
  // width: "100%",
  height: 500,
  border: "1px solid black",
  position: "relative",
  marginTop: 100,
};
export const Container = ({ hideSourceOnDrag, setCurrStep }) => {
  const dispatch = useDispatch();
  const { storeBoxes, isEditable } = useSelector((state) => state.finalStep);
  useEffect(() => {
    if (!!Object.keys(storeBoxes).length) {
      setBoxes(storeBoxes);
    }
    setIsChecked(isEditable);
  }, []);
  const [text, setText] = useState("");
  const initial = {
    a: { top: -100, left: 0, title: "X" },
    b: { top: -100, left: 80, title: "P" },
    c: { top: -100, left: 160, title: "T" },
    d: { top: -100, left: 240, title: "W/D" },
    e: { top: -100, left: 320, title: "JETS" },
    f: { top: -100, left: 400, title: "S/P" },
    g: { top: -100, left: 480, title: "Lights" },
    h: { top: -100, left: 560, title: "Arrow" },
    j: { top: -100, left: 560, title: "Arrow" },
    k: { top: -100, left: 560, title: "Arrow" },
    i: { top: -100, left: 640, title: "Text" },
  };
  const [boxes, setBoxes] = useState(initial);
  const [isChecked, setIsChecked] = useState(true);
  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes, setBoxes]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );
  const handleSubmit = () => {
    const arr = Object.values(boxes).filter(({ top }) => top > -100);

    if (!arr.length) {
      alert("Please drag atleast 1 item");
    } else {
      const tempArr = arr.map(({ top, left, title }) => ({
        x: left,
        y: top,
        height: 38,
        width: title === "Text" ? 165 : 70,
        itemName: title,
        description: title === "Text" ? text : title,
        itemStroke: "",
        itemStrokeThickness: 0,
        itemFill: "",
        itemFont: 14,
        itemWeight: "",
        zOrder: 0,
        dataType: "",
        itemLineType: "",
        x2: title === "Text" ? left + 165 : left + 70,
        y2: top + 38,
        itemTop: 0,
      }));
      dispatch(submitDiagramStartAsync(tempArr, boxes, isChecked, setCurrStep));
    }
  };
  return (
    <div style={{ border: "solid 1px #ccc" }}>
      {/* <AiOutlineArrowLeft style={{ width: 90 }} color="#000" /> */}

      <div className="d-flex align-items-start">
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
        <div ref={drop} style={styles}>
          {Object.keys(boxes).map((key) => {
            const { left, top, title } = boxes[key];
            return (
              <Box
                text={text}
                setText={setText}
                key={key}
                id={key}
                left={left}
                top={top}
                hideSourceOnDrag={hideSourceOnDrag}
                isChecked={isChecked}
              >
                {title}
              </Box>
            );
          })}
          <button
            style={{
              position: "absolute",
              border: "1px dashed gray",
              backgroundColor: "white",
              padding: "0.5rem 1rem",
              cursor: "move",
              top: -100,
              left: 720,
              backgroundColor: "red",
              marginRight: "10px",
              width: "70px",
              color: "#fff",
              textAlign: "center",
              padding: "3px",
              borderRadius: "5px",
              cursor: "pointer",
              height: "38px",
            }}
            onClick={() => setBoxes(initial)}
          >
            Reset
          </button>
          <div
            style={{
              width: "100%",
              top: "50%",
              position: "relative",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 10px",
              color: "#888",
              fontSize: 20,
            }}
          >
            <p className="mb-0" style={{ zIndex: 0 }}>
              Deep
            </p>
            <p className="mb-0" style={{ zIndex: 0 }}>
              Shallow
            </p>
          </div>
        </div>
      </div>
      {/* <div className={classes["horse-left-shoe"]}>S/P</div> */}
      <div
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
      </div>
    </div>
  );
};
