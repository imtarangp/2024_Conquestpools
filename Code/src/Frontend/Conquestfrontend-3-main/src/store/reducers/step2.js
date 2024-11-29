import {
  STEP2_SUBMIT_REQUEST,
  STEP2_SUBMIT_SUCCESS,
  STEP2_SUBMIT_FAILED,
  CLEAR_STEP2_FORM_SUCCESS,
} from "../constants/step2";
const initialState = {
  isLoading: false,
  values: {},
};

function toInt(str) {
  const x = parseInt(str);
  if (isNaN(x)) {
    return null;
  }
  return x;
}

const step2Reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case STEP2_SUBMIT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case STEP2_SUBMIT_SUCCESS:
      const data = payload?.data ?? {};
      console.log(data);
      return {
        ...state,
        isLoading: false,
        values: {
          ...data,
          spaJetHousingQty: toInt(data.spaJetHousingQty),
          spaJetinternalQty: toInt(data.spaJetinternalQty),
          spaWetKitQty: toInt(data.spaWetKitQty),
          spaVenturiKitQty: toInt(data.spaVenturiKitQty),
          brochuresQty: toInt(data.brochuresQty),
          eyeballWhiteQty: toInt(data.eyeballWhiteQty),
          eyeballGreyQty: toInt(data.eyeballGreyQty),
          downJetWhiteQty: toInt(data.downJetWhiteQty),
          downJetGreyQty: toInt(data.downJetGreyQty),
          suctionWhiteQty: toInt(data.suctionWhiteQty),
          suctionGreyQty: toInt(data.suctionGreyQty),
          suctionClearQty: toInt(data.suctionClearQty),
          beamTiesQty: toInt(data.beamTiesQty),
          fortymm90degElbowWhiteQty: toInt(data.fortymm90degElbowWhiteQty),
          fortymm45degElbowWhiteQty: toInt(data.fortymm45degElbowWhiteQty),
          fortymmTeeWhiteQty: toInt(data.fortymmTeeWhiteQty),
          fiftymm90degElbowWhiteQty: toInt(data.fiftymm90degElbowWhiteQty),
          fiftymm45degElbowWhiteQty: toInt(data.fiftymm45degElbowWhiteQty),
          fiftymmTeeWhiteQty: toInt(data.fiftymmTeeWhiteQty),
          clearPrimerQty: toInt(data.clearPrimerQty),
          redPrimerQty: toInt(data.redPrimerQty),
          clearGlueQty: toInt(data.clearGlueQty),
          greenGlueQty: toInt(data.greenGlueQty),
          maxisilSiliconWhiteQty: toInt(data.maxisilSiliconWhiteQty),
          maxisilSiliconClearQty: toInt(data.maxisilSiliconClearQty),
          infloorGearsQty: toInt(data.infloorGearsQty),
          infloorImpellarQty: toInt(data.infloorImpellarQty),
          infloorValveLidQty: toInt(data.infloorValveLidQty),
          infloorValveORingQty: toInt(data.infloorValveORingQty),
          infloorValveSteelClampQty: toInt(data.infloorValveSteelClampQty),
          infloorValveCompleteQty: toInt(data.infloorValveCompleteQty),
          infloorJetWhiteQty: toInt(data.infloorJetWhiteQty),
          infloorJetGreyQty: toInt(data.infloorJetGreyQty),
          infloorToolQty: toInt(data.infloorToolQty),
          ultraquestSkimmerBasketQty: toInt(data.ultraquestSkimmerBasketQty),
          ultraquestWeirDoorQty: toInt(data.ultraquestWeirDoorQty),
          ultraquestVacPlateQty: toInt(data.ultraquestVacPlateQty),
          ultraquestSkimmerLidBeigeQty: toInt(data.ultraquestSkimmerLidBeigeQty),
          ultraquestSkimmerLidGreyQty: toInt(data.ultraquestSkimmerLidGreyQty),
          blanketStrapQty: toInt(data.blanketStrapQty),
        },
        succesMsg: payload?.message,
      };
    case STEP2_SUBMIT_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload?.data,
      };
    case CLEAR_STEP2_FORM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        values: {},
        succesMsg: "Cleared",
      };
    default:
      return state;
  }
};

export default step2Reducer;

// 2 haleem
// 10 rotiyan
