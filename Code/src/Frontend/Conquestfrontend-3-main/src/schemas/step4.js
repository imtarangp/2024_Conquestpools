import * as yup from "yup";

export const step4Schema = yup.object({
  prePlumb: yup.object().required("Pre plumb is required"),
  stdPrePlumb: yup.object().required("Pump system is required").nullable(),
  trimPoolOnly: yup.object().required("Trip pool only is required"),
  cutSkimmer: yup
    .object()
    .required("Cut skimmer is required")
    .test("empty", "Cut skimmer is required", (obj) => {
      return Object.keys(obj).length !== 0;
    }),
  installHydro: yup.object().required("Install hydro is requisred"),
  cutHydro: yup.object().required("Cut hydro is required"),
  otherInstructions: yup.string(),
});
