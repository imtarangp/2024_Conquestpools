import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes.js";
import BoardInput from "../../uielements/BoardInput/BoardInput";
const style = {
  position: "absolute",
  border: "1px dashed gray",
  //   backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
  // backgroundColor: !isChecked ? "#08467f" : "#d9d2e5",
  // backgroundColor: "#08467f",
  //   margin-right: "10px",
  width: "70px",
  color: "#fff",
  textAlign: "center",
  padding: "3px",
  borderRadius: "5px",
  border: "dotted 1px #505050",
  //   cursor: "no-drop !important",
  fontFamily: "Poppins-Regular",
  fontSize: 14,
  height: 38,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 100,
  //   maxWidth: 150,
};
export const Box = ({
  id,
  left,
  top,
  hideSourceOnDrag,
  isChecked,
  children,
  text,
  setText,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (isDragging && hideSourceOnDrag) {
    return <div ref={isChecked ? drag : null} />;
  }
  if (id === "i" && top !== -100)
    return (
      <div
        className="box"
        ref={isChecked ? drag : null}
        style={{
          ...style,
          left,
          top,
          width: 165,
          backgroundColor: isChecked ? "#08467f" : "#d9d2e5",
        }}
        data-testid="box"
      >
        {/* <input placeholder="text" /> */}
        <BoardInput key={id} text={text} setText={setText} />
      </div>
    );
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
