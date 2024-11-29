import getStorage from "redux-persist/es/storage/getStorage";
import {
  STEP4_SUBMIT_REQUEST,
  STEP4_SUBMIT_SUCCESS,
  STEP4_SUBMIT_FAILED,
  CLEAR_STEP4_FORM_SUCCESS,
} from "../constants/step4";
import step2Reducer from "./step2";

const initialState = {
  isLoading: false,
  values: {
    installHydro: {value: 'yes', label: 'Yes'},
    otherInstructions: '',
    prePlumb: {value: '', label: ''},
    stdPrePlumb: {value: '', label: ''},
    trimPoolOnly: {value: '', label: ''},
    cutSkimmer: {value: '', label: ''}
  },
};

const step4Reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case STEP4_SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case STEP4_SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        values: payload?.data,
        succesMsg: payload?.message,
      };
    case STEP4_SUBMIT_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    case CLEAR_STEP4_FORM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        values: {},
        succesMsg: "Cleared",
      };
    default:
      return state;
  }
};

export default step4Reducer;
