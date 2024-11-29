import moment from "moment";
import { DEEP_TEXT, RECTANGLE, SHALLOW_TEXT } from "../store/constants/rectangle";
export const arrowLength = (x1, x2, y1, y2) => {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
};
export const calculateAngle = (x1, x2, y1, y2) => {
  const dy = y2 - y1;
  const dx = x2 - x1;
  let theta = Math.atan2(dy, dx);
  theta *= 180 / Math.PI;
  return theta;
};

const canvasRectCoords = {
  top: 0,
  left: 0,
};

const handleActiveTile = ({ setActiveTile, item }) =>
  setActiveTile({ ...item });

export const handleMouseDown = (
  e,
  setArrowClicked,
  setArrowClickMovable,
  setCreatedTiles,
  activeTile,
  currId
) => {
  const rect = e.target.getBoundingClientRect();
  canvasRectCoords.left = rect.left;
  canvasRectCoords.top = rect.top;

  const clientX = e.clientX - rect.left;
  const clientY = e.clientY - rect.top;

  setArrowClicked(true);
  setArrowClickMovable(true);
  setCreatedTiles((ps) => {
    return {
      ...ps,
      [`${currId}`]: {
        ...activeTile,
        y1: clientY,
        x1: clientX,
        top: clientY,
        left: clientX,
        itemTop: clientY,
        itemLeft: clientX,
        length: arrowLength(0, 0, 0, 0),
        angle: calculateAngle(clientX, clientY, 0, 0),
        itemId: currId,
        // ...arrowCoordinates,
      },
    };
  });
};
export const handleMouseMove = (
  e,
  createdTiles,
  setCreatedTiles,
  activeTile,
  currId
) => {
  const clientX = e.clientX - canvasRectCoords.left;
  const clientY = e.clientY - canvasRectCoords.top;

  setCreatedTiles((ps) => {
    return {
      ...ps,
      [`${currId}`]: {
        ...activeTile,
        ...ps[currId],
        x2: clientX,
        y2: clientY,
        length:
          arrowLength(
            createdTiles[currId].itemLeft,
            clientX,
            createdTiles[currId].itemTop,
            clientY
          ) || 0,
        angle:
          calculateAngle(
            createdTiles[currId].itemLeft,
            clientX,
            createdTiles[currId].itemTop,
            clientY
          ) || 0,
        itemId: currId,
      },
    };
  });
};
export const handleMouseUp = (
  setArrowClicked,
  setArrowClickMovable,
  setCurrId
) => {
  setArrowClicked(false);
  setArrowClickMovable(false);
  setCurrId((ps) => ps + 1);
};
export const handleClickTile = ({
  setActiveTile,
  setDropDownLevel,
  item,
  // id,
  // title,
}) => {
  handleActiveTile({ setActiveTile, item });
  if (item.id === 9) {
    setDropDownLevel(1);
  } else {
    setDropDownLevel(0);
  }
};
export const handleAddText = (
  createdTiles,
  currId,
  setCreatedTiles,
  setText,
  setDisplayTextModal,
  text
) => {
  const tempTiles = { ...createdTiles };
  const findItem = tempTiles[currId - 1];
  findItem.description = text;
  setCreatedTiles(tempTiles);
  setText("");
  setDisplayTextModal(false);
};
export const handleCreateTile = (
  e,
  activeTile,
  setDisplayTextModal,
  setCreatedTiles,
  currId,
  setCurrId
) => {
  const rect = e.target.getBoundingClientRect();
  const clientX = e.clientX - rect.left;
  const clientY = e.clientY - rect.top;
  console.log(clientY)

  //  const {clientX, clientY}  = e;

  if (!activeTile.id) {
    alert("Please select tile");
    return;
  } else {
    if (activeTile.id === 11) {
      setDisplayTextModal(true);
      setCreatedTiles((ps) => {
        return {
          ...ps,
          [`${currId}`]: {
            ...activeTile,
            y1: clientY,
            x1: clientX,
            top: clientY,
            left: clientX,
            itemTop: clientY,
            itemLeft: clientX,
            itemId: currId,
            description: "",
          },
        };
      });
      setCurrId((ps) => ps + 1);
    } else if (activeTile.id === 9) {
      if (activeTile.spaLabel === "Horse Shoe") {
        if (activeTile.spaSubLabel === "Left") {
          setCreatedTiles((ps) => {
            return {
              ...ps,
              [`${currId}`]: {
                ...activeTile,
                title: "",
                type: "Left-Shoe",
                ItemName: "SpaHorseShoe",
                Description: "Left",
                dataType: "Path",
                y1: clientY,
                x1: clientX,
                top: clientY,
                left: clientX,
                itemTop: clientY,
                itemLeft: clientX,
                itemId: currId,
              },
              [`${currId + 1}`]: {
                ...activeTile,
                top: clientY + 7,
                left: clientX + 14,
                itemTop: clientY + 7,
                itemLeft: clientX + 14,
                dataType: "Text",
              },
            };
          });
        } else if (activeTile.spaSubLabel === "Right") {
          setCreatedTiles((ps) => {
            return {
              ...ps,
              [`${currId}`]: {
                ...activeTile,
                title: "",
                type: "Right-Shoe",
                ItemName: "SpaHorseShoe",
                Description: "Right",
                dataType: "Path",
                y1: clientY,
                x1: clientX,
                top: clientY,
                left: clientX,
                itemTop: clientY,
                itemLeft: clientX,
                itemId: currId,
              },
              [`${currId + 1}`]: {
                ...activeTile,
                top: clientY + 7,
                left: clientX + 14,
                itemTop: clientY + 7,
                itemLeft: clientX + 14,
                dataType: "Text",
              },
            };
          });
        } else if (activeTile.spaSubLabel === "Up") {
          setCreatedTiles((ps) => {
            return {
              ...ps,
              [`${currId}`]: {
                ...activeTile,
                title: "",
                type: "Up-Shoe",
                ItemName: "SpaHorseShoe",
                Description: "Up",
                dataType: "Path",
                y1: clientY,
                x1: clientX,
                top: clientY,
                left: clientX,
                itemTop: clientY,
                itemLeft: clientX,
                itemId: currId,
              },
              [`${currId + 1}`]: {
                ...activeTile,
                top: clientY + 7,
                left: clientX + 14,
                itemTop: clientY + 7,
                itemLeft: clientX + 14,
                dataType: "Text",
              },
            };
          });
        } else if (activeTile.spaSubLabel === "Down") {
          setCreatedTiles((ps) => {
            return {
              ...ps,
              [`${currId}`]: {
                ...activeTile,
                title: "",
                type: "Down-Shoe",
                ItemName: "SpaHorseShoe",
                Description: "Down",
                dataType: "Path",
                y1: clientY,
                x1: clientX,
                top: clientY,
                left: clientX,
                itemTop: clientY,
                itemLeft: clientX,
                itemId: currId,
              },
              [`${currId + 1}`]: {
                ...activeTile,
                top: clientY + 15,
                left: clientX + 14,
                itemTop: clientY + 15,
                itemLeft: clientX + 14,
                dataType: "Text",
              },
            };
          });
        }
      } else if (activeTile.spaLabel === "Square") {
        setCreatedTiles((ps) => {
          return {
            ...ps,
            [`${currId}`]: {
              ...activeTile,
              title: "",
              type: "Square",
              dataType: "Rectangle",
              ItemName: "SpaSquare",
              Description: "Spa",
              itemStroke: "Black",
              itemStrokeThickness: 2,
              itemLineType: 'Solid',
              width: 80,
              height: 50,
              y1: clientY,
              x1: clientX,
              top: clientY,
              left: clientX,
              itemTop: clientY,
              itemLeft: clientX,
              itemId: currId,
            },
            [`${currId + 1}`]: {
              ...activeTile,
              top: clientY + 10,
              left: clientX + 28,
              itemTop: clientY + 10,
              itemLeft: clientX + 28,
              dataType: "Text"
            },
          };
        });
      } else if (activeTile.spaLabel === "Round") {
        setCreatedTiles((ps) => {
          return {
            ...ps,
            [`${currId}`]: {
              ...activeTile,
              title: "",
              type: "Round",
              dataType: "Ellipse",
              width: 50,
              height: 50,
              y1: clientY,
              x1: clientX,
              top: clientY,
              left: clientX,
              itemTop: clientY,
              itemLeft: clientX,
              itemId: currId,
              ItemName: "SpaRound",
              Description: "Spa",
              itemStroke: "Black",
              itemStrokeThickness: 2,
              itemLineType: "Solid",
            },
            [`${currId + 1}`]: {
              ...activeTile,
              top: clientY + 10,
              dataType: "Text",
              left: clientX + 14,
              itemTop: clientY + 10,
              itemLeft: clientX + 14
            },
          };
        });
      }
      setCurrId((ps) => ps + 2);
    } else {
      setCreatedTiles((ps) => {
        return {
          ...ps,
          [`${currId}`]: {
            ...activeTile,
            y1: clientY,
            x1: clientX,
            top: clientY,
            left: clientX,
            itemTop: clientY,
            itemLeft: clientX,
            itemId: currId,
          },
        };
      });
      setCurrId((ps) => ps + 1);
    }
  }
};
export const handleResetTiles = (
  setCreatedTiles,
  setCurrId,
  setArrowClickMovable,
  setArrowClicked
) => {
  setCreatedTiles({9991: RECTANGLE, 9992: DEEP_TEXT, 9993: SHALLOW_TEXT});
  setCurrId(1);
  setArrowClickMovable(false);
  setArrowClicked(false);
};
const getObjVal = (val) => ({
  value: val?.toLowerCase(),
  label: val,
});
export const step1ResubVals = (values) => {
  const {
    customer,
    customerMobileNumber,
    customerEmail,
    customerDeliveryAddress,
    customerPostalAddress,
    suburb,
    city,
    postcode,
    isPoolMeetingCrane,
    isPoolMeetingCraneTime,
    poolDeliveredEarlytoSite,
    kitPool,
    fullInFloorCleaning,
    slotDate,
    poolShape,
    poolColour,
    state,
  } = values;
  return {
    customer,
    customerMobileNumber,
    customerEmail,
    customerDeliveryAddress,
    customerPostalAddress,
    suburb: suburb || city,
    postcode,
    kitPool,
    state,
    slotDate: moment(slotDate).format("yyyy-MM-DD"),
    poolDeliveredEarlytoSite: getObjVal(poolDeliveredEarlytoSite),
    poolShape: poolShape,
    poolColour: poolColour,
    poolDeliveredInAfternoon: null,
    conquestRequiredtoLiftPoolIntoHoleOnSite: null,
    isPoolMeetingCrane: getObjVal(isPoolMeetingCrane),
    isPoolMeetingCraneTime: isPoolMeetingCrane === "Yes" ? isPoolMeetingCraneTime : "",
    fullInFloorCleaning,
  };
};
export const step2ResubVals = (values) => {
  const {
    skimmer,
    poolLights,
    poolLightsQty,
    transformer,
    spaJets,
    spaJetsQty,
    pipeing,
    pipeQty,
    pipeing2,
    pipeing2Qty,
    heating,
    blanketRoller,
    handoverKit,
    poolSalt,
    poolSaltQty,
    accAditionalOptions,
  } = values;
  return {
    skimmer,
    poolLights,
    poolLightsQty,
    transformer,
    spaJets,
    spaJetsQty,
    pipeing,
    pipeQty,
    pipeing2,
    pipeing2Qty,
    heating,
    blanketRoller,
    handoverKit,
    poolSalt,
    poolSaltQty,
    accAditionalOptions,
  };
};
export const step3ResubVals = (values, manuOrderArray, manuDefaultArray) => {
  const { fittingsColour, manufacturingNotes, spaHeight } = values;
  let manuFinalArray = [];
  if (!!manuOrderArray.length) {
    manuFinalArray = manuDefaultArray.filter((element1) => {
      return manuOrderArray.find((element2) => {
        return element1.label === element2.label;
      });
    });
  }
  if (!!manuOrderArray.length) {
    return {
      fittingsColour: getObjVal(fittingsColour),
      spaHeight:getObjVal(spaHeight),
      manufacturingNotes,
      "select-options": manuFinalArray,
    };
  } else {
    return {
      fittingsColour: getObjVal(fittingsColour),
      spaHeight:getObjVal(spaHeight),
      manufacturingNotes,
    };
  }
};
export const step4ResubVals = (values) => {
  const {
    prePlumb,
    stdPrePlumb,
    prePlumbSolarMainDrain,
    solarSuctionFittingsColour,
    trimPoolOnly,
    cutSkimmer,
    installHydro,
    otherInstructions,
  } = values;
  return {
    prePlumb: getObjVal(prePlumb),
    stdPrePlumb: getObjVal(stdPrePlumb),
    prePlumbSolarMainDrain: getObjVal(prePlumbSolarMainDrain),
    solarSuctionFittingsColour: getObjVal(solarSuctionFittingsColour),
    trimPoolOnly: getObjVal(trimPoolOnly),
    cutSkimmer: getObjVal(cutSkimmer),
    installHydro: getObjVal(installHydro),
    otherInstructions,
  };
};
export const stepSignResubVals = (values) => {
  const { signature } = values;
  return {
    signature,
  };
};
