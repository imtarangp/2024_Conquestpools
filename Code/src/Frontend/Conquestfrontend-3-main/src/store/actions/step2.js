import {
  STEP2_SUBMIT_REQUEST,
  STEP2_SUBMIT_SUCCESS,
  STEP2_SUBMIT_FAILED,
  CLEAR_STEP2_FORM_SUCCESS,
} from "../constants/step2";

const submitStep2ValuesRequest = () => ({
  type: STEP2_SUBMIT_REQUEST,
});

const submitStep2ValuesSuccess = (values) => ({
  type: STEP2_SUBMIT_SUCCESS,
  payload: { ...values },
});
const submitStep2ValuesFailed = (message) => ({
  type: STEP2_SUBMIT_FAILED,
  payload: message,
});
export const submitStep2ValuesStartAsync = (values, callBack) => (dispatch) => {
  dispatch(submitStep2ValuesRequest());
  if (!!Object.keys(values).length) {
    dispatch(
      submitStep2ValuesSuccess({
        data: values,
        msg: "Step 2 submitted",
      })
    );
    callBack?.((ps) => ps + 1);
  } else {
    dispatch(submitStep2ValuesFailed("Step 2 submission failed"));
  }
};

const clearStep2FormSuccess = () => ({
  type: CLEAR_STEP2_FORM_SUCCESS,
});
export const clearFormStep2 = () => (dispatch) => {
  dispatch(clearStep2FormSuccess());
};
