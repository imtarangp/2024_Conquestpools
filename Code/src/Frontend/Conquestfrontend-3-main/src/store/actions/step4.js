import {
  STEP4_SUBMIT_REQUEST,
  STEP4_SUBMIT_SUCCESS,
  STEP4_SUBMIT_FAILED,
  CLEAR_STEP4_FORM_SUCCESS,
} from "../constants/step4";

const submitStep4ValuesRequest = () => ({
  type: STEP4_SUBMIT_REQUEST,
});

const submitStep4ValuesSuccess = (values) => ({
  type: STEP4_SUBMIT_SUCCESS,
  payload: { ...values },
});
const submitStep4ValuesFailed = (message) => ({
  type: STEP4_SUBMIT_FAILED,
  payload: message,
});
export const submitStep4ValuesStartAsync = (values, callBack) => (dispatch) => {
  dispatch(submitStep4ValuesRequest());
  if (!!Object.keys(values).length) {
    dispatch(
      submitStep4ValuesSuccess({
        data: values,
        msg: "Step 4 submitted",
      })
    );
    callBack?.((ps) => ps + 1);
  } else {
    dispatch(submitStep4ValuesFailed("Step 4 submission failed"));
  }
};

const clearStep4FormSuccess = () => ({
  type: CLEAR_STEP4_FORM_SUCCESS,
});
export const clearFormStep4 = () => (dispatch) => {
  dispatch(clearStep4FormSuccess());
};
