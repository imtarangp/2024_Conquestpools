import {
  STEP1_SUBMIT_REQUEST,
  STEP1_SUBMIT_SUCCESS,
  STEP1_SUBMIT_FAILED,
  CLEAR_STEP1_FORM_SUCCESS,
} from "../constants/step1";

const submitStep1ValuesRequest = () => ({
  type: STEP1_SUBMIT_REQUEST,
});

const submitStep1ValuesSuccess = (values) => ({
  type: STEP1_SUBMIT_SUCCESS,
  payload: { ...values },
});
const submitStep1ValuesFailed = (message) => ({
  type: STEP1_SUBMIT_FAILED,
  payload: message,
});
export const submitStep1ValuesStartAsync = (values, callBack) => (dispatch) => {
  dispatch(submitStep1ValuesRequest());
  if (!!Object.keys(values).length) {
    dispatch(
      submitStep1ValuesSuccess({
        data: values,
        msg: "Step 1 submitted",
      })
    );
    callBack?.((ps) => ps + 1);
  } else {
    dispatch(submitStep1ValuesFailed("Step 1 submission failed"));
  }
};

const clearStep1FormSuccess = () => ({
  type: CLEAR_STEP1_FORM_SUCCESS,
});
export const clearFormStep1 = () => (dispatch) => {
  dispatch(clearStep1FormSuccess());
};
