import {
  GET_POOL_SIZE_REQUEST,
  GET_POOL_SIZE_SUCCESS,
  GET_POOL_SIZE_FAILED,
  GET_POOL_SHAPE_REQUEST,
  GET_POOL_SHAPE_SUCCESS,
  GET_POOL_SHAPE_FAILED,
  GET_POOL_COLOUR_REQUEST,
  GET_POOL_COLOUR_SUCCESS,
  GET_POOL_COLOUR_FAILED,
  GET_SKIMMER_REQUEST,
  GET_SKIMMER_SUCCESS,
  GET_SKIMMER_FAILED,
  GET_POOL_LIGHTS_REQUEST,
  GET_POOL_LIGHTS_SUCCESS,
  GET_POOL_LIGHTS_FAILED,
  GET_TRANSFORMER_REQUEST,
  GET_TRANSFORMER_SUCCESS,
  GET_TRANSFORMER_FAILED,
  GET_SPA_JETS_REQUEST,
  GET_SPA_JETS_SUCCESS,
  GET_SPA_JETS_FAILED,
  GET_PIPE_REQUEST,
  GET_PIPE_SUCCESS,
  GET_PIPE_FAILED,
  GET_HEATING_REQUEST,
  GET_HEATING_SUCCESS,
  GET_HEATING_FAILED,
  GET_BLANKET_ROLLER_REQUEST,
  GET_BLANKET_ROLLER_SUCCESS,
  GET_BLANKET_ROLLER_FAILED,
  GET_HANDOVER_KIT_REQUEST,
  GET_HANDOVER_KIT_SUCCESS,
  GET_HANDOVER_KIT_FAILED,
  GET_POOL_SALT_REQUEST,
  GET_POOL_SALT_SUCCESS,
  GET_POOL_SALT_FAILED,
  GET_MANUFACTURING_OPTIONS_REQUEST,
  GET_MANUFACTURING_OPTIONS_SUCCESS,
  GET_MANUFACTURING_OPTIONS_FAILED,
  GET_ORDER_POLICY_REQUEST,
  GET_ORDER_POLICY_SUCCESS,
  GET_ORDER_POLICY_FAILED,
} from "../constants/dropdowns";

const initialState = {
  poolSizeArray: [],
  poolShapeArray: [],
  poolColourArray: [],
  orderPolicy: {},  
  skimmerArray: [],
  poolLightsArray: [],
  transformerArray: [],
  spaJetsArray: [],
  pipeArray: [],
  heatingArray: [],
  blanketRollerArray: [],
  handoverKitArray: [],
  poolSaltArray: [],
  manufacturingOptionsArray: [],
  isLoadingDropdown: false,
  errMsg: "",
  successMsg: "",
};

const dropdownReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POOL_SIZE_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_POOL_SIZE_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        poolSizeArray: payload?.data,
        poolSizeRawArray: payload?.rawData,
      };
    case GET_POOL_SIZE_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };  
    case GET_POOL_SHAPE_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_POOL_SHAPE_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        poolShapeArray: payload?.data,
        poolShapeRawArray: payload?.rawData,
      };
    case GET_POOL_SHAPE_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_POOL_COLOUR_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_POOL_COLOUR_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        poolColourArray: payload?.data,
        poolColourRawArray: payload?.rawData,
      };
    case GET_POOL_COLOUR_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_SKIMMER_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_SKIMMER_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        skimmerArray: payload?.data,
        skimmerRawArray: payload?.rawData,
      };
    case GET_SKIMMER_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_POOL_LIGHTS_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_POOL_LIGHTS_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        poolLightsArray: payload?.data,
        poolLightsRawArray: payload?.rawData,
      };
    case GET_POOL_LIGHTS_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_TRANSFORMER_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_TRANSFORMER_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        transformerArray: payload?.data,
        transformerRawArray: payload?.rawData,
      };
    case GET_TRANSFORMER_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_SPA_JETS_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_SPA_JETS_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        spaJetsArray: payload?.data,
        spaJetsRawArray: payload?.rawData,
      };
    case GET_SPA_JETS_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_PIPE_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_PIPE_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        pipeArray: payload?.data,
        pipeRawArray: payload?.rawData,
      };
    case GET_PIPE_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_HEATING_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_HEATING_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        heatingArray: payload?.data,
        heatingRawArray: payload?.rawData,
      };
    case GET_HEATING_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_BLANKET_ROLLER_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_BLANKET_ROLLER_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        blanketRollerArray: payload?.data,
        blanketRollerRawArray: payload?.rawData,
      };
    case GET_BLANKET_ROLLER_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_HANDOVER_KIT_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_HANDOVER_KIT_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        handoverKitArray: payload?.data,
        handoverKitRawArray: payload?.rawData,
      };
    case GET_HANDOVER_KIT_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_POOL_SALT_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_POOL_SALT_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        poolSaltArray: payload?.data,
        poolSaltRawArray: payload?.rawData,
      };
    case GET_POOL_SALT_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_MANUFACTURING_OPTIONS_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };
    case GET_MANUFACTURING_OPTIONS_SUCCESS:
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        manufacturingOptionsArray: payload?.data,
        manufacturingOptionsRawArray: payload?.rawData,
      };
    case GET_MANUFACTURING_OPTIONS_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };
    case GET_ORDER_POLICY_REQUEST:
      return {
        ...state,
        isLoadingDropdown: true,
      };  
    case GET_ORDER_POLICY_SUCCESS: 
      return {
        ...state,
        isLoadingDropdown: false,
        successMsg: payload.msg,
        orderPolicy: payload?.data,
      };  
    case GET_ORDER_POLICY_FAILED:
      return {
        ...state,
        isLoadingDropdown: false,
        errMsg: payload.msg,
      };   
    default:
      return state;
  }
};
export default dropdownReducer;
