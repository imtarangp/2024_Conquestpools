import {
  STEP3_SUBMIT_REQUEST,
  STEP3_SUBMIT_SUCCESS,
  STEP3_SUBMIT_FAILED,
  CLEAR_STEP3_FORM_SUCCESS,
} from "../constants/step3";

const submitStep3ValuesRequest = () => ({
  type: STEP3_SUBMIT_REQUEST,
});

const submitStep3ValuesSuccess = (values) => ({
  type: STEP3_SUBMIT_SUCCESS,
  payload: { ...values },
});
const submitStep3ValuesFailed = (message) => ({
  type: STEP3_SUBMIT_FAILED,
  payload: message,
});
export const submitStep3ValuesStartAsync = (values, callBack) => (dispatch) => {
  dispatch(submitStep3ValuesRequest());
  if (!!Object.keys(values).length) {
    dispatch(
      submitStep3ValuesSuccess({
        data: values,
        msg: "Step 3 submitted",
      })
    );
    callBack?.((ps) => ps + 1);
  } else {
    dispatch(submitStep3ValuesFailed("Step 3 submission failed"));
  }
};

const clearStep3FormSuccess = () => ({
  type: CLEAR_STEP3_FORM_SUCCESS,
});
export const clearFormStep3 = () => (dispatch) => {
  dispatch(clearStep3FormSuccess());
};
