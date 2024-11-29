import {
  STEP1_SUBMIT_REQUEST,
  STEP1_SUBMIT_SUCCESS,
  STEP1_SUBMIT_FAILED,
  CLEAR_STEP1_FORM_SUCCESS,
} from "../constants/step1";
const initialState = {
  isLoading: false,
  values: {},
};

const step1Reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case STEP1_SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case STEP1_SUBMIT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        values: payload?.data,
        succesMsg: payload?.message,
      };
    case STEP1_SUBMIT_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    case CLEAR_STEP1_FORM_SUCCESS:
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

export default step1Reducer;

// 2 haleem
// 10 rotiyan
