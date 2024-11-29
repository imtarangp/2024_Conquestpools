import { arrowLength, calculateAngle } from "../../utils/helper";
import {
  DIAGRAM_SUBMIT_REQUEST,
  DIAGRAM_SUBMIT_SUCCESS,
  DIAGRAM_SUBMIT_FAILED,
  SIGNATURE_SUBMIT_REQUEST,
  SIGNATURE_SUBMIT_SUCCESS,
  SIGNATURE_SUBMIT_FAILED,
  FORM_SUBMIT_REQUEST,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILED,
  CLEAR_FINAL_STEP_FORM_SUCCESS,
  FINAL_BOARD_SUBMIT_REQUEST,
  FINAL_BOARD_SUBMIT_SUCCESS,
  FINAL_BOARD_SUBMIT_FAILED,
  SIGNATURE_RE_SUBMIT_REQUEST,
  SIGNATURE_RE_SUBMIT_SUCCESS,
  SIGNATURE_RE_SUBMIT_FAILED,
  CLEAR_SIGNATURE_REQUEST,
  CLEAR_SIGNATURE_SUCCESS,
  CLEAR_SIGNATURE_FAILED,
} from "../constants/finalStep";
import {
  GET_ORDER_IMAGE_ITEMS_FAILED,
  GET_ORDER_IMAGE_ITEMS_REQUEST,
  GET_ORDER_IMAGE_ITEMS_SUCCESS,
} from "../constants/orders";

import { RECTANGLE, DEEP_TEXT, SHALLOW_TEXT } from "./../constants/rectangle";

const initialState = {
  isLoading: false,
  list: [],
  signature: "",
  signatureURL: "",
  formStatus: "",
  finalBoard: [],
  storeBoxes: {},
  isEditable: true,
  diagram: { 9991: RECTANGLE, 9992: DEEP_TEXT, 9993: SHALLOW_TEXT },
};

const finalStepReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case DIAGRAM_SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DIAGRAM_SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: payload?.data?.values,
        storeBoxes: payload?.data?.boxes,
        succesMsg: payload?.message,
        isEditable: payload?.data?.isChecked,
        diagram: { ...payload.data },
      };
    case DIAGRAM_SUBMIT_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    case SIGNATURE_SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNATURE_SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        signature: payload?.data,
        signatureURL: payload?.dataURL,
        succesMsg: payload?.message,
      };
    case SIGNATURE_SUBMIT_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    case SIGNATURE_RE_SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNATURE_RE_SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        signatureURL: payload?.dataURL,
        succesMsg: payload?.msg,
      };
    case SIGNATURE_RE_SUBMIT_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    case CLEAR_SIGNATURE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CLEAR_SIGNATURE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        signature: "",
        signatureURL: "",
        succesMsg: payload?.msg,
      };
    case CLEAR_SIGNATURE_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    case FINAL_BOARD_SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FINAL_BOARD_SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        finalBoard: payload?.data,
        succesMsg: payload?.message,
      };
    case FINAL_BOARD_SUBMIT_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    case FORM_SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FORM_SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        formStatus: "Submitted",
        succesMsg: "Form Submitted",
      };
    case FORM_SUBMIT_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    case CLEAR_FINAL_STEP_FORM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [],
        signature: "",
        signatureURL: "",
        formStatus: "",
        diagram: { 9991: RECTANGLE, 9992: DEEP_TEXT, 9993: SHALLOW_TEXT },
      };

    case GET_ORDER_IMAGE_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ORDER_IMAGE_ITEMS_SUCCESS:
      const payloadUpdate = payload?.data?.map((item) => {
        let canvasItem = {
          ...item,
          x1: item.x,
          y1: item.y,
          top: item.itemTop,
          left: item.itemLeft,
          title: item.description,
        };

        if (item.dataType === "Arrow") {
          canvasItem.angle = calculateAngle(item.x, item.x2, item.y, item.y2);
          canvasItem.length = arrowLength(item.x, item.x2, item.y, item.y2);
        }

        return canvasItem;
      });

      return {
        ...state,
        isLoading: false,
        diagram: payloadUpdate,
        succesMsg: payload?.message,
      };
    case GET_ORDER_IMAGE_ITEMS_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    default:
      return state;
  }
};

export default finalStepReducer;
