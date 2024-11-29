import {
  STEP3_SUBMIT_REQUEST,
  STEP3_SUBMIT_SUCCESS,
  STEP3_SUBMIT_FAILED,
  CLEAR_STEP3_FORM_SUCCESS,
} from "../constants/step3";
const initialState = {
  isLoading: false,
  values: {},
};

const step3Reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case STEP3_SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case STEP3_SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        values: payload?.data,
        succesMsg: payload?.message,
      };
    case STEP3_SUBMIT_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    case CLEAR_STEP3_FORM_SUCCESS:
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

export default step3Reducer;

// 2 haleem
// 10 rotiyan
