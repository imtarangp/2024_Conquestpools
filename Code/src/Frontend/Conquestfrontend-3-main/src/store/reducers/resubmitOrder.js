import {
  LOAD_RESUB_ORDER_REQUEST,
  LOAD_RESUB_ORDER_SUCCESS,
  DEL_RESUB_SIGN_ORDER_REQUEST,
  DEL_RESUB_SIGN_ORDER_SUCCESS,
} from "../constants/resubmitOrder";
const initialState = {
  isLoading: false,
  resubValues: {},
};

const resubOrderReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case LOAD_RESUB_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOAD_RESUB_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resubValues: payload?.data,
        succesMsg: payload?.message,
      };
    case DEL_RESUB_SIGN_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DEL_RESUB_SIGN_ORDER_SUCCESS:
      const tempResub = { ...state.resubValues };
      delete tempResub.signature;
      return {
        ...state,
        isLoading: false,
        resubValues: tempResub,
        succesMsg: payload?.message,
      };

    default:
      return state;
  }
};

export default resubOrderReducer;

// 2 haleem
// 10 rotiyan
