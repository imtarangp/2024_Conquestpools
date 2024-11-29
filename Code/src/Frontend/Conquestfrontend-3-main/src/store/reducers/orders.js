import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED,
  GET_ORDER_MANUFAC_REQUEST,
  GET_ORDER_MANUFAC_SUCCESS,
  GET_ORDER_MANUFAC_FAILED,
  DECLINE_ORDER_REQUEST,
  DECLINE_ORDER_SUCCESS,
  DECLINE_ORDER_FAILED,
} from "../constants/orders";
const initialState = {
  isLoading: false,
  orders: [],
  orderManufac: [],
  orderImgs: [],
  isLoadingManufac: false,
};

const ordersReducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: payload?.data,
        succesMsg: payload?.message,
      };
    case GET_ORDERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    case GET_ORDER_MANUFAC_REQUEST:
      return {
        ...state,
        isLoadingManufac: true,
      };
    case GET_ORDER_MANUFAC_SUCCESS:
      return {
        ...state,
        isLoadingManufac: false,
        orderManufac: payload?.data,
        succesMsg: payload?.message,
      };
    case GET_ORDER_MANUFAC_FAILED:
      return {
        ...state,
        isLoadingManufac: false,
        errorMessage: payload?.data,
      };
    case DECLINE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case DECLINE_ORDER_SUCCESS:
      const tempOrders = [...state.orders];
      const orderIndex = tempOrders.findIndex(
        (el) => el.id === payload.data.id
      );
      tempOrders[orderIndex].declinedOrderInfo = payload.data.reason;
      tempOrders[orderIndex].orderStatus = "Declined";
      return {
        ...state,
        isLoading: false,
        orders: [...tempOrders],
        succesMsg: payload?.message,
      };
    case DECLINE_ORDER_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    default:
      return state;
  }
};

export default ordersReducer;

// 2 haleem
// 10 rotiyan
