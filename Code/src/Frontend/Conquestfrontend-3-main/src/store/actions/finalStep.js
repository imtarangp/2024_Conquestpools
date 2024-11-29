import {
  DIAGRAM_SUBMIT_REQUEST,
  DIAGRAM_SUBMIT_SUCCESS,
  DIAGRAM_SUBMIT_FAILED,
  SIGNATURE_SUBMIT_REQUEST,
  SIGNATURE_SUBMIT_SUCCESS,
  SIGNATURE_SUBMIT_FAILED,
  SIGNATURE_RE_SUBMIT_REQUEST,
  SIGNATURE_RE_SUBMIT_SUCCESS,
  SIGNATURE_RE_SUBMIT_FAILED,
  FORM_SUBMIT_REQUEST,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILED,
  CLEAR_FINAL_STEP_FORM_SUCCESS,
  FINAL_BOARD_SUBMIT_REQUEST,
  FINAL_BOARD_SUBMIT_SUCCESS,
  FINAL_BOARD_SUBMIT_FAILED,
  CLEAR_SIGNATURE_REQUEST,
  CLEAR_SIGNATURE_SUCCESS,
} from "../constants/finalStep";
import useJwt from "../../services/authService/auth/useJwt";
import { Toast } from "../../utils/alert";
import { AUTH_LOGOUT_SUCCESS } from "../constants/auth";
import {
  GET_ORDER_IMAGE_ITEMS_FAILED,
  GET_ORDER_IMAGE_ITEMS_SUCCESS,
  GET_ORDER_IMAGE_ITEMS_REQUEST,
} from "../constants/orders";
const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});

const submitDiagramRequest = () => ({
  type: DIAGRAM_SUBMIT_REQUEST,
});

const submitDiagramSuccess = (values) => ({
  type: DIAGRAM_SUBMIT_SUCCESS,
  payload: { ...values },
});
const submitDiagramFailed = (message) => ({
  type: DIAGRAM_SUBMIT_FAILED,
  payload: message,
});
// export const submitDiagramStartAsync =
//   (values, boxes, isChecked, callBack) => (dispatch) => {
//     dispatch(submitDiagramRequest());
//     if (!!Object.keys(values).length) {
//       dispatch(
//         submitDiagramSuccess({
//           data: { values, boxes, isChecked },
//           msg: "Step 4 submitted",
//         })
//       );
//       callBack((ps) => ps + 1);
//     } else {
//       dispatch(submitDiagramFailed("Step 4 submission failed"));
//     }
//   };
export const submitDiagramStartAsync = (diagram, callBack) => (dispatch) => {
  dispatch(submitDiagramRequest());
  if (!!Object.keys(diagram).length) {
    dispatch(
      submitDiagramSuccess({
        data: { ...diagram },
        msg: "Step 4 submitted",
      })
    );
    callBack?.((ps) => ps + 1);
  } else {
    dispatch(submitDiagramFailed("Step 4 submission failed"));
  }
};
const submitSignatureRequest = () => ({
  type: SIGNATURE_SUBMIT_REQUEST,
});

const submitSignatureSuccess = (values) => ({
  type: SIGNATURE_SUBMIT_SUCCESS,
  payload: { ...values },
});
const submitSignatureFailed = (message) => ({
  type: SIGNATURE_SUBMIT_FAILED,
  payload: message,
});
export const submitSignatureStartAsync =
  (sign, signURL, callBack) => (dispatch) => {
    dispatch(submitSignatureRequest());
    if (!!sign) {
      dispatch(
        submitSignatureSuccess({
          data: sign,
          dataURL: signURL,
          msg: "Step 4 submitted",
        })
      );
      // callBack((ps) => ps + 1);
    } else {
      dispatch(submitSignatureFailed("Step 4 submission failed"));
    }
  };
const reSubmitSignatureRequest = () => ({
  type: SIGNATURE_RE_SUBMIT_REQUEST,
});

const reSubmitSignatureSuccess = (values) => ({
  type: SIGNATURE_RE_SUBMIT_SUCCESS,
  payload: { ...values },
});
const reSubmitSignatureFailed = (message) => ({
  type: SIGNATURE_RE_SUBMIT_FAILED,
  payload: message,
});
export const reSubmitSignatureStartAsync = (signURL) => (dispatch) => {
  dispatch(reSubmitSignatureRequest());
  if (!!signURL) {
    dispatch(
      reSubmitSignatureSuccess({
        dataURL: signURL,
        msg: "Signature Resubmitted",
      })
    );
  } else {
    dispatch(reSubmitSignatureFailed("Step 4 submission failed"));
  }
};
const clearSignatureRequest = () => ({
  type: CLEAR_SIGNATURE_REQUEST,
});

const clearSignatureSuccess = (values) => ({
  type: CLEAR_SIGNATURE_SUCCESS,
  payload: { ...values },
});
export const clearSignatureStartAsync = () => (dispatch) => {
  dispatch(clearSignatureRequest());
  dispatch(
    clearSignatureSuccess({
      msg: "Signature Resubmitted",
    })
  );
};
const submitFinalBoardRequest = () => ({
  type: FINAL_BOARD_SUBMIT_REQUEST,
});

const submitFinalBoardSuccess = (values) => ({
  type: FINAL_BOARD_SUBMIT_SUCCESS,
  payload: { ...values },
});
const submitFinalBoardFailed = (message) => ({
  type: FINAL_BOARD_SUBMIT_FAILED,
  payload: message,
});
export const submitFinalBoardStartAsync = (board) => (dispatch) => {
  dispatch(submitFinalBoardRequest());
  if (!!board.length) {
    dispatch(
      submitFinalBoardSuccess({
        data: [...board],
        msg: "Step 4 submitted",
      })
    );
  } else {
    dispatch(submitFinalBoardFailed("Step 4 submission failed"));
  }
};
const submitFormRequest = () => ({
  type: FORM_SUBMIT_REQUEST,
});

export const submitFormSuccess = (values) => ({
  type: FORM_SUBMIT_SUCCESS,
  payload: { ...values },
});
const submitFormFailed = (message) => ({
  type: FORM_SUBMIT_FAILED,
  payload: message,
});
export const submitFormStartAsync = (payload, sign, callBack) => (dispatch) => {
  const { form, diagram, manufacOptions, finalDiagram } = payload;
  const finalSignDiagram = {
    // ...diagram,
    list: [{ value: "test", description: "test" }],
    signature: sign,
  };
  const finalForm = {
    ...form,
    id: 0,
    signature: sign,
  };
  dispatch(submitFormRequest());
  if (!!Object.keys(payload).length) {

    useJwt
      .postData("/Order", finalForm)
      .then((res) => {
        const orderId = res?.data?.data;
        const finalDiagramArray = finalDiagram.map((item) => ({
          ...item,
          orderId,
        }));

        useJwt
          .postData("/DiagramSignature", {
            orderId,
            ...finalSignDiagram,
          })
          .then(() => {
            !!manufacOptions?.length &&
              useJwt.postData("/OrderManufacturing/OrderManufacturing", {
                orderId,
                item: manufacOptions.length ? [...manufacOptions] : [],
              });
            useJwt.postData("/OrderImageItems", finalDiagramArray).then(() => {
              dispatch(submitFormSuccess());
            });
            callBack((ps) => ps + 1);
          })
          .catch((err) => {
            Toast("error", err.message || "Failed to submit");
          });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(authLogoutSuccess());
        }
        Toast("error", err.message || "Failed to submit");
        dispatch(submitFormFailed("Form submission failed"));
      });
  } else {
    dispatch(submitFormFailed("Step 4 submission failed"));
  }
};
export const reSubmitFormStartAsync =
  (payload, id, sign, callBack) => (dispatch) => {
    const { form, diagram, manufacOptions, finalDiagram } = payload;
    const finalSignDiagram = {
      // ...diagram,
      list: [{ value: "test", description: "test" }],
      signature: sign,
    };
    const finalForm = {
      ...form,
      id,
      signature: sign,
    };
    const finalDiagramArray = finalDiagram.map((item) => ({
      ...item,
      orderId: id,
    }));
    dispatch(submitFormRequest());
    if (!!Object.keys(payload).length) {
      useJwt
        .postData("/Order", finalForm)
        .then(() => {
          useJwt
            .postData("/DiagramSignature", {
              orderId: id,
              ...finalSignDiagram,
            })
            .then((resp) => {
              !!manufacOptions?.length &&
                useJwt
                  .postData("/OrderManufacturing/OrderManufacturing", {
                    orderID: id,
                    item: manufacOptions,
                  })
                  .then((response) => {
                    dispatch(submitFormSuccess());
                  });
              useJwt
                .postData("/OrderImageItems", finalDiagramArray)
                .then((response) => {
                  dispatch(submitFormSuccess());
                });
              callBack((ps) => ps + 1);
            })
            .catch((err) => {
              Toast("error", err.message || "Failed to submit");
            });
        })
        .catch((err) => {
          if (err.response.status === 401) {
            dispatch(authLogoutSuccess());
          }

          Toast("error", err.message || "Failed to submit");
          dispatch(submitFormFailed("Form submission failed"));
        });
    } else {
      dispatch(submitFormFailed("Step 4 submission failed"));
    }
  };

const clearFinalStepFormSuccess = () => ({
  type: CLEAR_FINAL_STEP_FORM_SUCCESS,
});
export const clearFormFinalStep = () => (dispatch) => {
  dispatch(clearFinalStepFormSuccess());
};

const getOrderImageItemsRequest = () => ({
  type: GET_ORDER_IMAGE_ITEMS_REQUEST,
});

const getOrderImageItemsSuccess = (images) => ({
  type: GET_ORDER_IMAGE_ITEMS_SUCCESS,
  payload: { ...images },
});

const getOrderImageItemsFailed = (msg) => ({
  type: GET_ORDER_IMAGE_ITEMS_FAILED,
  msg: msg,
});

export const getOrderImagesAsync = (orderId) => (dispatch) => {
  dispatch(getOrderImageItemsRequest());
  useJwt
    .getData(`/OrderImageItems?orderId=${orderId}`)
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getOrderImageItemsSuccess({
          data: data.reverse(),
          msg: "Order Images Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getOrderImageItemsFailed("Failed to load Order Images"));
    });
};
