import * as yup from "yup";
export const step3Schema = yup
  .object({
    fittingsColour: yup.object().required('Fittings colour is required').nullable(),
    "select-options": yup.array().min(1, "at least 1").nullable(),
    manufacturingNotes: yup.string(),   
    spaHeight: yup.object().required('Spa Height is required').nullable(),
  })
  .required();
