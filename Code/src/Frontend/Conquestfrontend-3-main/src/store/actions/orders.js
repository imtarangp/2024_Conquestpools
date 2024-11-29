import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,
  DECLINE_ORDER_REQUEST,
  DECLINE_ORDER_SUCCESS,
  DECLINE_ORDER_FAILED,
  GET_ORDER_MANUFAC_REQUEST,
  GET_ORDER_MANUFAC_SUCCESS,
  GET_ORDER_MANUFAC_FAILED,
} from "../constants/orders";
import useJwt from "../../services/authService/auth/useJwt";
import { Toast } from "../../utils/alert";
import { AUTH_LOGOUT_SUCCESS } from "../constants/auth";
import { arrayReform } from "../../services/arrayReform";
import moment from "moment";

const getOrdersRequest = () => ({
  type: GET_ORDERS_REQUEST,
});
const getOrdersSuccess = (poolSizeData) => ({
  type: GET_ORDERS_SUCCESS,
  payload: { ...poolSizeData },
});
const getOrdersFailed = (message) => ({
  type: GET_ORDERS_FAILED,
  msg: message,
});
// export const getOrdersStartAsync = () => (dispatch) => {
//   dispatch(getOrdersRequest());
//   useJwt
//     .getData("/Order/Get")
//     .then((res) => {
//       const data = res?.data?.data;
//       dispatch(
//         getOrdersSuccess({
//           data: data.reverse(),
//           msg: "Pool Size Fetched Successfully",
//         })
//       );
//     })
//     .catch((err) => {
//       dispatch(getOrdersFailed("Failed to load pool size"));
//     });
// };
const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});


const sortByDate = (orderA, orderB) => {
  return new Date(orderB.slotDate) - new Date(orderA.slotDate)
}


export const getOrdersStartAsync = () => (dispatch) => {
  dispatch(getOrdersRequest());
  useJwt
    .getData("/Order/Get")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getOrdersSuccess({
          data: data.sort(sortByDate),
          msg: "Pool Size Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getOrdersFailed("Failed to load pool size"));
    });
};
const getOrderManufacsRequest = () => ({
  type: GET_ORDER_MANUFAC_REQUEST,
});
const getOrderManufacsSuccess = (orderManufacs) => ({
  type: GET_ORDER_MANUFAC_SUCCESS,
  payload: { ...orderManufacs },
});
const getOrderManufacsFailed = (message) => ({
  type: GET_ORDER_MANUFAC_FAILED,
  msg: message,
});
export const getOrderManufacsStartAsync = (orderID) => (dispatch) => {
  dispatch(getOrderManufacsRequest());
  useJwt
    .getData(`/OrderManufacturing?OrderID=${orderID}`)
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getOrderManufacsSuccess({
          // data: data.reverse(),
          data: arrayReform(data, "orderID", "item"),
          msg: "Pool Size Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getOrderManufacsFailed("Failed to load pool size"));
    });
};
const getPendingOrdersRequest = () => ({
  type: GET_ORDERS_REQUEST,
});
const getPendingOrdersSuccess = (poolSizeData) => ({
  type: GET_ORDERS_SUCCESS,
  payload: { ...poolSizeData },
});
const getPendingOrdersFailed = (message) => ({
  type: GET_ORDERS_FAILED,
  msg: message,
});
export const getPendingOrdersStartAsync = () => (dispatch) => {
  dispatch(getPendingOrdersRequest());
  useJwt
    .getData("/Order/PendingOrder")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getPendingOrdersSuccess({
          data: data.reverse(),
          msg: "Pool Size Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getPendingOrdersFailed("Failed to load pool size"));
    });
};
const getApprovedOrdersRequest = () => ({
  type: GET_ORDERS_REQUEST,
});
const getApprovedOrdersSuccess = (poolSizeData) => ({
  type: GET_ORDERS_SUCCESS,
  payload: { ...poolSizeData },
});
const getApprovedOrdersFailed = (message) => ({
  type: GET_ORDERS_FAILED,
  msg: message,
});
export const getApprovedOrdersStartAsync = () => (dispatch) => {
  dispatch(getApprovedOrdersRequest());
  useJwt
    .getData("/Order/ApprovedOrder")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getApprovedOrdersSuccess({
          data: data.reverse(),
          msg: "Pool Size Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getApprovedOrdersFailed("Failed to load pool size"));
    });
};
const getDeclinedOrdersRequest = () => ({
  type: GET_ORDERS_REQUEST,
});
const getDeclinedOrdersSuccess = (poolSizeData) => ({
  type: GET_ORDERS_SUCCESS,
  payload: { ...poolSizeData },
});
const getDeclinedOrdersFailed = (message) => ({
  type: GET_ORDERS_FAILED,
  msg: message,
});
export const getDeclinedOrdersStartAsync = () => (dispatch) => {
  dispatch(getDeclinedOrdersRequest());
  useJwt
    .getData("/Order/GetOrderDeclined")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getDeclinedOrdersSuccess({
          data: data.reverse(),
          msg: "Pool Size Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getDeclinedOrdersFailed("Failed to load pool size"));
    });
};
const declineOrderRequest = () => ({
  type: DECLINE_ORDER_REQUEST,
});
const declineOrderSuccess = (poolSizeData) => ({
  type: DECLINE_ORDER_SUCCESS,
  payload: { ...poolSizeData },
});
const declineOrderFailed = (message) => ({
  type: DECLINE_ORDER_FAILED,
  msg: message,
});
export const declineOrderStartAsync = (id, reason, callBack) => (dispatch) => {
  const payload = {
    id,
    declinedOrderInfo: reason,
    orderStatus: "Declined",
  };
  dispatch(declineOrderRequest());
  useJwt
    .postData("/Order/PostOrderDeclined", payload)
    .then((res) => {
      dispatch(
        declineOrderSuccess({
          data: {
            id,
            reason,
          },
          msg: "Order Declined Successfully",
        })
      );
      callBack();
      Toast("success", "Order declined");
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(declineOrderFailed("Failed to load pool size"));
      Toast("error", err.message || "Failed to decline order");
    });
};
