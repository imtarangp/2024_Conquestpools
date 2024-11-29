import {
  LOAD_RESUB_ORDER_REQUEST,
  LOAD_RESUB_ORDER_SUCCESS,
  DEL_RESUB_SIGN_ORDER_REQUEST,
  DEL_RESUB_SIGN_ORDER_SUCCESS,
} from "../constants/resubmitOrder";
const loadReSubOrderRequest = () => ({
  type: LOAD_RESUB_ORDER_REQUEST,
});

const loadReSubOrderSuccess = (values) => ({
  type: LOAD_RESUB_ORDER_SUCCESS,
  payload: { ...values },
});
export const loadReSubOrderStartAsync = (values) => (dispatch) => {
  dispatch(loadReSubOrderRequest());
  if (!!Object.keys(values).length) {
    dispatch(
      loadReSubOrderSuccess({
        data: values,
        msg: "Step 1 submitted",
      })
    );
  } else {
    throw new Error("Failed");
  }
};
const delReSubDignRequest = () => ({
  type: DEL_RESUB_SIGN_ORDER_REQUEST,
});

const delReSubDignSuccess = (values) => ({
  type: DEL_RESUB_SIGN_ORDER_SUCCESS,
});
export const delReSubDignStartAsync = (values) => (dispatch) => {
  dispatch(delReSubDignRequest());
  dispatch(delReSubDignSuccess());
};
