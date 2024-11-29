import * as yup from "yup";
export const declineSchema = yup
  .object({
    reason: yup.string().required("Required"),
  })
  .required();
