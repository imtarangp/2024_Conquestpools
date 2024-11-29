import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import { AiOutlineCaretLeft } from "react-icons/ai";
import classes from "./style.module.css";
const style = {
  position: "absolute",
  cursor: "move",
  width: "70px",
  color: "#fff",
  textAlign: "center",
  padding: "3px",
  borderRadius: "5px",
  border: "dotted 1px #505050",
  fontFamily: "Poppins-Regular",
  fontSize: 14,
  height: 38,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
};
export const Box = ({
  id,
  itemId,
  left,
  top,
  isChecked,
  children,
  type,
  angle,
  itemName,
  dataType,
  length,
  setSelectedItem,
  selectedItem,
  handleRemove,
  description,
  isDeleteMode,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, itemId, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  const handleRemoveDiaItem = (id) => {
    handleRemove(id);
  };

  if (isDragging) {
    return <div ref={isChecked ? drag : null} />;
  }
  if (
    children === "X" ||
    children === "P" ||
    children === "T" ||
    children === "S/P" ||
    children === "W/D" ||
    children === "O" 
  ) {
    return (
      <div
        className="box"
        ref={isChecked ? drag : null}
        style={{
          position: "absolute",
          left,
          top,
          fontSize: 30,
          fontWeight: 800,
          color: isDeleteMode ? "red" : "#000",
        }}
        data-testid="box"
        // onClick={isDeleteMode && isChecked && () =>handleRemoveDiaItem}
        onClick={(e) => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
      >
        {children}
      </div>
    );
  }
  if (itemName === "Jets" || children === 'J') {
    return (
      <div
        className="box"
        ref={isChecked ? drag : null}
        style={{
          position: "absolute",
          left,
          top,
          fontSize: 30,
          fontWeight: 800,
          color: isDeleteMode ? "red" : "#000",
        }}
        onClick={() => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
        data-testid="box"
      >
        J
      </div>
    );
  }
  
  if (itemName === "Spillway" || children === '|||') {
    return (
      <div
        className="box"
        ref={isChecked ? drag : null}
        style={{
          position: "absolute",
          left,
          top,
          fontSize: 30,
          fontWeight: 800,
          color: isDeleteMode ? "red" : "#000",
        }}
        onClick={() => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
        data-testid="box"
      >
        |||
      </div>
    );
  }
  if (itemName === "Lights" ) {
    return (
      <div
        className="box"
        ref={isChecked ? drag : null}
        style={{
          position: "absolute",
          left,
          top,
          fontSize: 30,
          fontWeight: 800,
          color: isDeleteMode ? "red" : "#000",
        }}
        onClick={() => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
        data-testid="box"
      >
        O
      </div>
    );
  }
  if (itemName === "TextItem" || (dataType === 'Text' && itemName !== 'TextSpa')) {
    return (
      <div
        className="box"
        ref={isChecked ? drag : null}
        style={{
          position: "absolute",
          left,
          top,
          color: isDeleteMode ? "red" : "#000",
        }}
        onClick={() => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
        data-testid="box"
      >
        <p>{description}</p>
      </div>
    );
  }
  if (children === "Spa" && itemName === 'TextSpa') {
    return (
      <div
        className="box"
        ref={isChecked ? drag : null}
        style={{
          color: isDeleteMode ? "red" : "#000",
          position: "absolute",
          zIndex: 1,
          left,
          top,
        }}
        onClick={() => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
        data-testid="box"
      >
        {children}
      </div>
    );
  }
  if (children === 'Left' || type === "Left-Shoe") {
    return (
      <div
        ref={isChecked ? drag : null}
        className={[
          classes["horse-left-shoe"],
          isDeleteMode ? classes["delete-box"] : classes["normal-box"],
        ].join(" ")}
        style={{
          background: "#fff",
          position: "absolute",
          left,
          top,
        }}
        onClick={() => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
      />
    );
  }
  if (children === 'Right' || type === "Right-Shoe") {
    return (
      <div
        ref={isChecked ? drag : null}
        className={[
          classes["horse-right-shoe"],
          isDeleteMode ? classes["delete-box"] : classes["normal-box"],
        ].join(" ")}
        style={{
          background: "#fff",
          position: "absolute",
          left,
          top,
        }}
        onClick={() => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
      />
    );
  }
  if (children === 'Up' || type === "Up-Shoe") {
    return (
      <div
        ref={isChecked ? drag : null}
        className={[
          classes["horse-up-shoe"],
          isDeleteMode ? classes["delete-box"] : classes["normal-box"],
        ].join(" ")}
        style={{
          background: "#fff",
          position: "absolute",
          left,
          top,
        }}
        onClick={() => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
      />
    );
  }
  if (children === 'Down' || type === "Down-Shoe") {
    return (
      <div
        ref={isChecked ? drag : null}
        className={[
          classes["horse-down-shoe"],
          isDeleteMode ? classes["delete-box"] : classes["normal-box"],
        ].join(" ")}
        style={{
          background: "#fff",
          position: "absolute",
          left,
          top,
        }}
        onClick={() => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
      />
    );
  }
  if (type === 'Square' || itemName === "SpaSquare") {
    return (
      <div
        ref={isChecked ? drag : null}
        className={[
          classes["square-spa"],
          isDeleteMode ? classes["delete-box"] : classes["normal-box"],
        ].join(" ")}
        style={{
          // ...style,
          background: "#fff",
          position: "absolute",
          left,
          top,
        }}
        onClick={() => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
      />
    );
  }
  if (type === 'Round' || itemName === "SpaRound") {
    return (
      <div
        ref={isChecked ? drag : null}
        className={[
          classes["round-spa"],
          isDeleteMode ? classes["delete-box"] : classes["normal-box"],
        ].join(" ")}
        style={{
          // ...style,
          background: "#fff",
          position: "absolute",
          left,
          top,
        }}
        onClick={() => {
          isDeleteMode && isChecked && handleRemoveDiaItem(id);
        }}
      />
    );
  }
  if (itemName === "Arrow" || dataType === 'Arrow') {
    return (
      <>
        <span
          className="box arrow"
          ref={isChecked ? drag : null}
          style={{
            position: "absolute",
            left,
            top,
            width: length,
            height: 1,
            border: `solid 1px ${isDeleteMode ? "red" : "#000"}`,
            transform: `rotate(${angle}deg)`,
            transformOrigin: "0% 0%",
          }}
          data-testid="box"
          onClick={() => {
            isDeleteMode && isChecked && handleRemoveDiaItem(id);
          }}
        >
          <AiOutlineCaretLeft
            color={isDeleteMode ? "red" : "#000"}
            style={{
              transform: `rotate(${180}deg)`,
              position: "absolute",
              right: -12,
              top: -8,
            }}
          />
        </span>
      </>
    );
  }
  return (
    <div
      className="box"
      ref={isChecked ? drag : null}
      style={{
        ...style,
        left,
        top,
        backgroundColor: isChecked ? "#08467f" : "#d9d2e5",
      }}
      data-testid="box"
    >
      {children}
    </div>
  );
};
