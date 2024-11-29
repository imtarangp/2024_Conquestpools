import * as yup from "yup";
export const step2Schema = yup.object({
  skimmer: yup.object().nullable(),
  poolLights: yup.object().nullable(),
  poolLightsQty: yup.number(),

  transformer: yup.object().nullable(),
  // spaJets: yup.object().nullable(),
  // spaJetsQty: yup.number(),

  pipeing: yup.object().nullable(),
  pipeQty: yup.number(),

  pipeing2: yup.object().nullable(),
  pipeing2Qty: yup.number(),

  // heating: yup.object().nullable(),
  blanketRoller: yup.object().nullable(),
  handoverKit: yup.object().nullable(),
  poolSalt: yup.object().nullable(),
  poolSaltQty: yup.number().nullable(),

  accAditionalOptions: yup.string(),
  //
});
// .required();
