import {
  BUTTON_DRAGGED_TO_DEEP_SUCCESS,
  // BUTTON_DRAGGED_TO_SHALLOW_SUCCESS,
} from "../constants/diagram";
const initialState = {
  buttonsList: [
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
  ],
  deepBoardList: [],
  shallowBoardList: [],
};

const diagramReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case BUTTON_DRAGGED_TO_DEEP_SUCCESS:
      const tempButtons = [...state?.buttonsList];
      const tileIndex = state?.buttonsList?.findIndex(
        (btn) => btn?.id === payload?.id
      );
      tempButtons[tileIndex].isDragged = true;
      break;
    default:
      return state;
  }
};

export default diagramReducer;

// 2 haleem
// 10 rotiyan
