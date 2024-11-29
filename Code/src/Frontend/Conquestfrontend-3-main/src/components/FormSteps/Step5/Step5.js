import React, { useCallback, useEffect, useRef, useState } from "react";
import update from "immutability-helper";
import { useDrop } from "react-dnd";
import { Box } from "./Box.js";
import { ItemTypes } from "./ItemTypes.js";
import classes from "./style.module.css";
import { AiOutlineCaretLeft } from "react-icons/ai";
import BackButton from "../../uielements/BackButton/BackButton";
import SubmitButton from "../../uielements/SubmitButton/SubmitButton";
import "animate.css";
import { submitDiagramStartAsync } from "../../../store/actions/finalStep.js";
import { useDispatch, useSelector } from "react-redux";
import data from "../../../data/orderTable.json";
import {
  handleAddText,
  handleClickTile,
  handleCreateTile,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleResetTiles,
} from "../../../utils/helper";
import {
  DEEP_TEXT,
  RECTANGLE,
  SHALLOW_TEXT,
} from "../../../store/constants/rectangle.js";
const Step5 = ({ setCurrStep }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const { diagram } = useSelector((state) => state?.finalStep);
  useEffect(() => {
    setCreatedTiles(diagram);
    if (!!diagram.length) {
      setCurrId(diagram.length);
    }
  }, []);

  const [createdTiles, setCreatedTiles] = useState({});
  const [activeTile, setActiveTile] = useState({});
  const [currId, setCurrId] = useState(4);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [arrowClickMovable, setArrowClickMovable] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [dropDownLevel, setDropDownLevel] = useState(0);
  const [text, setText] = useState("");
  const [displayTextModal, setDisplayTextModal] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    dispatch(submitDiagramStartAsync(createdTiles, setCurrStep));
  };
  const tiles = data.tiles;
  const handleRemove = (id) => {
    const tempTiles = { ...createdTiles };
    delete tempTiles[id];
    setCreatedTiles({
      ...tempTiles,
    });
  };
  const moveBox = useCallback(
    (id, left, top) => {
      setCreatedTiles(
        update(createdTiles, {
          [id]: {
            $merge: { left, top, itemLeft: left, itemTop: top },
          },
        })
      );
    },
    [createdTiles, setCreatedTiles]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.itemId, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );
  const spaTypes = data.spaTypes;
  const handleClickSpaType = (id, label) => {
    setActiveTile((ps) => ({
      ...ps,
      spaId: id,
      spaLabel: label,
    }));
    setDropDownLevel(0);
  };
  const handleClickSpaSubType = (id, label) => {
    setActiveTile((ps) => ({
      ...ps,
      spaSubId: id,
      spaSubLabel: label,
    }));
    setDropDownLevel(0);
  }

  const dropdownRef = useRef(null);
  useEffect(() => {
    let handler = (e) => {
      if (!dropdownRef?.current?.contains(e.target)) {
        setDropDownLevel(0);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  const handleAddEditMode = () => {
    setIsChecked((ps) => !ps);
    if (isDeleteMode) {
      setIsDeleteMode((ps) => !ps);
    }
  };
  const handleDeleteMode = () => {
    setIsDeleteMode((ps) => !ps);
    if (!isChecked) {
      setIsChecked((ps) => !ps);
    }
  };

  const filterDefaults = (key) => {
    return (createdTiles[key].itemName !== DEEP_TEXT.itemName &&
      createdTiles[key].itemName !== SHALLOW_TEXT.itemName &&
      createdTiles[key].itemName !== RECTANGLE.itemName &&
      createdTiles[key].itemName !== "Pooloutline")
  }
  return (
    <div>
      {displayTextModal && (
        <div
          className="d-flex flex-column align-items-center"
          style={{
            position: "absolute",
            left: "48%",
            zIndex: 1,
            background: "#fff",
            width: 350,
            // padding: "20px 20px 0px 20px",
            border: "solid 1px #ccc",
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={classes["add-text-input"]}
            placeholder="Text"
          />
          <button
            onClick={() =>
              handleAddText(
                createdTiles,
                currId,
                setCreatedTiles,
                setText,
                setDisplayTextModal,
                text
              )
            }
            className={classes["add-text-button"]}
          >
            Add Text
          </button>
        </div>
      )}
      <div className="d-flex align-items-center">
        <div className="d-flex flex-column col-2">
          <div className="d-flex align-items-center col-12">
            <div className="d-flex">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleAddEditMode}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="mx-2">
              <p className={["mb-0", classes["label"]].join(" ")}>
                {isChecked ? "Edit Mode" : "Add Mode"}
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center col-12">
            <div className="d-flex">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={isDeleteMode}
                  onChange={handleDeleteMode}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="mx-2">
              <p className={["mb-0", classes["label"]].join(" ")}>
                {isDeleteMode ? "Delete Mode On" : "Delete Mode Off"}
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center col-10">
          {tiles.map((item) => (
            <div key={item.id}>
              <div
                className={[
                  classes["tile"],
                  activeTile.id === item.id && classes["active-tile"],
                ].join(" ")}
                onClick={() =>
                  handleClickTile({
                    setActiveTile,
                    setDropDownLevel,
                    item,
                    // id,
                    // title,
                  })
                }
              >
                <label>{item.title}</label>
              </div>
              {item.id === 9 && dropDownLevel >= 1 && (
                <div
                  className={[
                    classes["dropdown-wrapper"],
                    "animate__animated,animate__zoomIn,animate__faster",
                  ].join(" ")}
                  ref={dropdownRef}
                >
                  <div className={classes["dropdown-content-wrapper"]}>
                    {dropDownLevel === 1 &&
                      spaTypes.map(({ spaId, spaLabel }) => {
                        if (spaLabel === "Horse Shoe") {
                          return (
                            <div
                              key={spaId}
                              className="d-flex align-items-center"
                              onClick={() => {
                                handleClickSpaType(spaId, spaLabel);
                                setDropDownLevel(2);
                              }}
                            >
                              <p className="mb-0">{spaLabel}</p>
                              <AiOutlineCaretLeft
                                style={{
                                  margin: "0px 5px",
                                  transform: `rotate(${180}deg)`,
                                }}
                              />
                            </div>
                          );
                        } else
                          return (
                            <p
                              key={spaId}
                              onClick={() =>
                                handleClickSpaType(spaId, spaLabel)
                              }
                            >
                              {spaLabel}
                            </p>
                          );
                      })}
                    {dropDownLevel === 2 &&
                      spaTypes[2].subTypes.map(({ spaSubId, spaSubLabel }) => {
                        return (
                          <p
                            className="mb-0"
                            key={spaSubId}
                            onClick={() =>
                              handleClickSpaSubType(spaSubId, spaSubLabel)
                            }
                          >
                            {spaSubLabel}
                          </p>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className={[classes["reset-tile"]].join(" ")}
            onClick={() =>
              handleResetTiles(
                setCreatedTiles,
                setCurrId,
                setArrowClickMovable,
                setArrowClicked
              )
            }
          >
            <label>Reset</label>
          </div>
        </div>
      </div>
      <div
        id="parent"
        ref={drop}
        className={classes["board"]}
        onMouseDown={
          activeTile.title === "Arrow" && !isChecked
            ? (e) =>
              handleMouseDown(
                e,
                setArrowClicked,
                setArrowClickMovable,
                setCreatedTiles,
                activeTile,
                currId
              )
            : null
        }
        onMouseMove={
          activeTile.title === "Arrow" &&
            arrowClicked &&
            arrowClickMovable &&
            !isChecked
            ? (e) =>
              handleMouseMove(
                e,
                createdTiles,
                setCreatedTiles,
                activeTile,
                currId
              )
            : null
        }
        onMouseUp={
          activeTile.title === "Arrow" && !isChecked
            ? () =>
              handleMouseUp(setArrowClicked, setArrowClickMovable, setCurrId)
            : null
        }
        onClick={
          activeTile.title !== "Arrow" && !isChecked
            ? (e) =>
              handleCreateTile(
                e,
                activeTile,
                setDisplayTextModal,
                setCreatedTiles,
                currId,
                setCurrId
              )
            : null
        }
      >
        <div className={classes["big-box"]}>
          <div
            // className={classes["deep-shallow-wrapper"]}
            style={{
              width: "100%",
              // position: "relative",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 50px",
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
  {
    Object.keys(createdTiles).filter(filterDefaults).map((key, i) => {
      const {
        left,
        itemId,
        itemName,
        itemType,
        top,
        dataType,
        title,
        type,
        length,
        angle,
        x2,
        y2,
        description,
      } = createdTiles[key];
      return (
        <Box
          isDeleteMode={isDeleteMode}
          key={key}
          id={key}
          left={left}
          top={top}
          isChecked={isChecked}
          itemName={itemName}
          itemType={itemType}
          itemId={key}
          type={type}
          dataType={dataType}
          length={length}
          angle={angle}
          x2={x2}
          y2={y2}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          handleRemove={handleRemove}
          description={description}
        >
          {title}
        </Box>
      );
    })
  }
      </div >
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
    </div >
  );
};

export default Step5;
