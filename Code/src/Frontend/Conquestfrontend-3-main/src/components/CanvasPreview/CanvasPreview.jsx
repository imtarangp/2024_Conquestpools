import { DEEP_TEXT, RECTANGLE, SHALLOW_TEXT } from "../../store/constants/rectangle"
import { Box } from "../FormSteps/Step5/Box"
import classes from "../FormSteps/Step5/style.module.css";

export const CanvasPreview = ({ diagram }) => {

    const filterDefaults = (key) => {
        return (diagram[key].itemName !== DEEP_TEXT.itemName &&
            diagram[key].itemName !== SHALLOW_TEXT.itemName &&
            diagram[key].itemName !== RECTANGLE.itemName &&
            diagram[key].itemName !== "Pooloutline")
    }


    return <div
        id="parent"
        className={classes["board"]}>
        <div className={classes["big-box"]} style={{ zIndex: 1 }}>
            <div
                style={{
                    width: "100%",
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
            Object.keys(diagram).filter(filterDefaults).map((key) => {
                const { left, itemName, itemType, top, dataType, title,
                    type, length, angle, x2, y2, description, } = diagram[key];

                return (
                    <Box
                        key={key}
                        id={key}
                        left={left}
                        top={top}
                        itemName={itemName}
                        itemType={itemType}
                        itemId={key}
                        type={type}
                        dataType={dataType}
                        length={length}
                        angle={angle}
                        x2={x2}
                        y2={y2}
                        description={description}
                    >
                        {title}
                    </Box>
                );
            })
        }
    </div >
}