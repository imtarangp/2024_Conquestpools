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
  GET_ORDER_POLICY_FAILED,
  GET_ORDER_POLICY_SUCCESS,
  GET_ORDER_POLICY_REQUEST,
} from "../constants/dropdowns";
import useJwt from "../../services/authService/auth/useJwt";
import { arrayReform } from "../../services/arrayReform";
import { AUTH_LOGOUT_SUCCESS } from "../constants/auth";
const config = useJwt.jwtConfig;
const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});

const getPoolSizeRequest = () => ({
  type: GET_POOL_SIZE_REQUEST,
});

const getPoolSizeSuccess = (poolSizeData) => ({
  type: GET_POOL_SIZE_SUCCESS,
  payload: { ...poolSizeData },
});

const getPoolSizeFailed = (message) => ({
  type: GET_POOL_SIZE_FAILED,
  msg: message,
});

export const getPoolSizeStartAsync = () => (dispatch) => {
  dispatch(getPoolSizeRequest());
  useJwt
    .getData("/Dropdown/GetPoolSize")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getPoolSizeSuccess({
          data: arrayReform(data, "id", "size"),
          rawData: data,
          msg: "Pool Size Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getPoolSizeFailed("Failed to load pool size"));
    });
};

const getPoolShapeRequest = () => ({
  type: GET_POOL_SHAPE_REQUEST,
});

const getPoolShapeSuccess = (poolSizeData) => ({
  type: GET_POOL_SHAPE_SUCCESS,
  payload: { ...poolSizeData },
});

const getPoolShapeFailed = (message) => ({
  type: GET_POOL_SHAPE_FAILED,
  msg: message,
});

export const getPoolShapeStartAsync = () => (dispatch) => {
  dispatch(getPoolShapeRequest());
  useJwt
    .getData("/Dropdown/GetPoolShape")
    .then((res) => {
      const data = res?.data?.data;
      console.log("data: ", data);
      dispatch(
        getPoolShapeSuccess({
          data: data.map((item) => ({
            value: item.id,
            label: item.shape,
          })),
          rawData: data,
          msg: "Pool Size Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getPoolShapeFailed("Failed to load pool size"));
    });
};

const getOrderPolicyRequest = () => ({
  type: GET_ORDER_POLICY_REQUEST,
});

const getOrderPolicySuccess = (conquestDealerData) => ({
  type: GET_ORDER_POLICY_SUCCESS,
  payload: { ...conquestDealerData },
});

const getOrderPolicyFailed = (message) => ({
  type: GET_ORDER_POLICY_FAILED,
  sg: message,
});

export const getOrderPolicyStartAsync = () => (dispatch) => {
  dispatch(getOrderPolicyRequest());
  useJwt
    .getData("/Dropdown/GetOrderPolicy")
    .then((res) => {
      const data = res?.data?.data;
      console.log("data3: ", data);
      dispatch(
        getOrderPolicySuccess({
          data: data,
          rawData: data,
          msg: "Conquest Dealer Fetched Successfully",
        })
      );
    })
    .catch(() => {
      dispatch(getOrderPolicyFailed("Failed to load conquest dealer"));
    });
};

const getPoolColourRequest = () => ({
  type: GET_POOL_COLOUR_REQUEST,
});

const getPoolColourSuccess = (poolColourData) => ({
  type: GET_POOL_COLOUR_SUCCESS,
  payload: { ...poolColourData },
});

const getPoolColourFailed = (message) => ({
  type: GET_POOL_COLOUR_FAILED,
  msg: message,
});

export const getPoolColourStartAsync = () => (dispatch) => {
  dispatch(getPoolColourRequest());
  useJwt
    .getData("/Dropdown/GetPoolColour")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getPoolColourSuccess({
          data: arrayReform(data, "id", "colour"),
          rawData: data,
          msg: "Pool Colour Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getPoolColourFailed("Failed to load pool colour"));
    });
};

const getSkimmerRequest = () => ({
  type: GET_SKIMMER_REQUEST,
});

const getSkimmerSuccess = (skimmerData) => ({
  type: GET_SKIMMER_SUCCESS,
  payload: { ...skimmerData },
});

const getSkimmerFailed = (message) => ({
  type: GET_SKIMMER_FAILED,
  msg: message,
});

export const getSkimmerStartAsync = () => (dispatch) => {
  dispatch(getSkimmerRequest());
  useJwt
    .getData("/Dropdown/GetSkimmer")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getSkimmerSuccess({
          data: arrayReform(data, "id", "name", "cost"),
          rawData: data.map((x) => ({
            value: x.id,
            label: x.name,
            name: x.name,
            cost: x.cost,
          })),
          msg: "Skimmer Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getSkimmerFailed("Failed to load skimmer"));
    });
};
const getPoolLightsRequest = () => ({
  type: GET_POOL_LIGHTS_REQUEST,
});
const getPoolLightsSuccess = (poolLightsData) => ({
  type: GET_POOL_LIGHTS_SUCCESS,
  payload: { ...poolLightsData },
});
const getPoolLightsFailed = (message) => ({
  type: GET_POOL_LIGHTS_FAILED,
  msg: message,
});

export const getPoolLightsStartAsync = () => (dispatch) => {
  dispatch(getPoolLightsRequest());
  useJwt
    .getData("/Dropdown/GetPoolLights")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getPoolLightsSuccess({
          data: arrayReform(data, "id", "name", "cost"),
          rawData: data.map((x) => ({
            value: x.id,
            label: x.name,
            name: x.name,
            cost: x.cost,
          })),
          msg: "Pool Lights Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getPoolLightsFailed("Failed to load pool lights"));
    });
};

const getTransformerRequest = () => ({
  type: GET_TRANSFORMER_REQUEST,
});
const getTransformerSuccess = (transformerData) => ({
  type: GET_TRANSFORMER_SUCCESS,
  payload: { ...transformerData },
});
const getTransformerFailed = (message) => ({
  type: GET_TRANSFORMER_FAILED,
  msg: message,
});

export const getTransformerStartAsync = () => (dispatch) => {
  dispatch(getTransformerRequest());
  useJwt
    .getData("/Dropdown/GetTransformer")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getTransformerSuccess({
          data: arrayReform(data, "id", "name", "cost"),
          rawData: data.map((x) => ({
            value: x.id,
            label: x.name,
            name: x.name,
            cost: x.cost,
          })),
          msg: "Transformer Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getTransformerFailed("Failed to load pool transformer"));
    });
};

const getSpaJetsRequest = () => ({
  type: GET_SPA_JETS_REQUEST,
});

const getSpaJetsSuccess = (spaJetsData) => ({
  type: GET_SPA_JETS_SUCCESS,
  payload: { ...spaJetsData },
});
const getSpaJetsFailed = (message) => ({
  type: GET_SPA_JETS_FAILED,
  msg: message,
});

export const getSpaJetsStartAsync = () => (dispatch) => {
  dispatch(getSpaJetsRequest());
  useJwt
    .getData("/Dropdown/GetSpaJets")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getSpaJetsSuccess({
          data: arrayReform(data, "id", "name", "cost"),
          rawData: data.map((x) => ({
            value: x.id,
            label: x.name,
            name: x.name,
            cost: x.cost,
          })),
          msg: "SPA JETS Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getSpaJetsFailed("Failed to load pool spa jets"));
    });
};

const getPipeRequest = () => ({
  type: GET_PIPE_REQUEST,
});

const getPipeSuccess = (pipeData) => ({
  type: GET_PIPE_SUCCESS,
  payload: { ...pipeData },
});

const getPipeFailed = (message) => ({
  type: GET_PIPE_FAILED,
  msg: message,
});

export const getPipeStartAsync = () => (dispatch) => {
  dispatch(getPipeRequest());
  useJwt
    .getData("/Dropdown/GetPipe")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getPipeSuccess({
          data: arrayReform(data, "id", "item", "cost"),
          rawData: data.map((x) => ({
            value: x.id,
            label: x.item,
            name: x.item,
            cost: x.cost,
          })),
          msg: "Pipe Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getPipeFailed("Failed to load pool spa pipe"));
    });
};

const getHeatingRequest = () => ({
  type: GET_HEATING_REQUEST,
});

const getHeatingSuccess = (heatingData) => ({
  type: GET_HEATING_SUCCESS,
  payload: { ...heatingData },
});

const getHeatingFailed = (message) => ({
  type: GET_HEATING_FAILED,
  msg: message,
});

export const getHeatingStartAsync = () => (dispatch) => {
  dispatch(getHeatingRequest());
  useJwt
    .getData("/Dropdown/GetHeating")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getHeatingSuccess({
          data: arrayReform(data, "id", "name", "cost"),
          rawData: data.map((x) => ({
            value: x.id,
            label: x.name,
            name: x.name,
            cost: x.cost,
          })),
          msg: "Heating Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getHeatingFailed("Failed to load pool spa heating"));
    });
};

const getBlanketRollerRequest = () => ({
  type: GET_BLANKET_ROLLER_REQUEST,
});

const getBlanketRollerSuccess = (blanketRollerData) => ({
  type: GET_BLANKET_ROLLER_SUCCESS,
  payload: { ...blanketRollerData },
});

const getBlanketRollerFailed = (message) => ({
  type: GET_BLANKET_ROLLER_FAILED,
  msg: message,
});

export const getBlanketRollerStartAsync = () => (dispatch) => {
  dispatch(getBlanketRollerRequest());
  useJwt
    .getData("/Dropdown/GetBlanketRoller")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getBlanketRollerSuccess({
          data: arrayReform(data, "id", "name", "cost"),
          rawData: data.map((x) => ({
            value: x.id,
            label: x.name,
            name: x.name,
            cost: x.cost,
          })),
          msg: "Blanket Roller Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getBlanketRollerFailed("Failed to load pool blanket roller"));
    });
};

const getHandeoverKitRequest = () => ({
  type: GET_HANDOVER_KIT_REQUEST,
});

const getHandeoverKitSuccess = (blanketRollerData) => ({
  type: GET_HANDOVER_KIT_SUCCESS,
  payload: { ...blanketRollerData },
});

const getHandeoverKitFailed = (message) => ({
  type: GET_HANDOVER_KIT_FAILED,
  msg: message,
});

export const getHandeoverKitStartAsync = () => (dispatch) => {
  dispatch(getHandeoverKitRequest());
  useJwt
    .getData("/Dropdown/GetHandoverKit")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getHandeoverKitSuccess({
          data: arrayReform(data, "id", "name", "cost"),
          rawData: data.map((x) => ({
            value: x.id,
            label: x.name,
            name: x.name,
            cost: x.cost,
          })),
          msg: "Handover Kit Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getHandeoverKitFailed("Failed to load pool handover kit"));
    });
};

const getPoolSaltRequest = () => ({
  type: GET_POOL_SALT_REQUEST,
});

const getPoolSaltSuccess = (poolSaltData) => ({
  type: GET_POOL_SALT_SUCCESS,
  payload: { ...poolSaltData },
});

const getPoolSaltFailed = (message) => ({
  type: GET_POOL_SALT_FAILED,
  msg: message,
});

export const getPoolSaltStartAsync = () => (dispatch) => {
  dispatch(getPoolSaltRequest());
  useJwt
    .getData("/Dropdown/GetPoolSalt")
    .then((res) => {
      const data = res?.data?.data;
      dispatch(
        getPoolSaltSuccess({
          data: arrayReform(data, "id", "name", "cost"),
          rawData: data.map((x) => ({
            value: x.id,
            label: x.name,
            name: x.name,
            cost: x.cost,
          })),
          msg: "Pool Salt Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(getPoolSaltFailed("Failed to load pool salt"));
    });
};

const getManufacturingOptionsRequest = () => ({
  type: GET_MANUFACTURING_OPTIONS_REQUEST,
});

const getManufacturingOptionsSuccess = (poolSaltData) => ({
  type: GET_MANUFACTURING_OPTIONS_SUCCESS,
  payload: { ...poolSaltData },
});

const getManufacturingOptionsFailed = (message) => ({
  type: GET_MANUFACTURING_OPTIONS_FAILED,
  msg: message,
});

export const getManufacturingOptionsStartAsync = () => (dispatch) => {
  dispatch(getManufacturingOptionsRequest());
  useJwt
    .getData("/Dropdown/GetManufacturingItem")
    .then((res) => {
      const data = res?.data?.data;
      const reformedData = arrayReform(data, "id", "item");
      const filteredData = reformedData
        ?.map((item) => ({
          ...item,
          label: item.label.trim(),
        }))
        ?.filter((el) => el.label !== "");
      dispatch(
        getManufacturingOptionsSuccess({
          data: filteredData,
          msg: "Manufacturing Options Fetched Successfully",
        })
      );
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(authLogoutSuccess());
      }
      dispatch(
        getManufacturingOptionsFailed("Failed to load manufacturing options")
      );
    });
};
