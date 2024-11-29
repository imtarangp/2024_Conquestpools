import * as yup from "yup";

export const step7Schema = yup
  .object({
    printName: yup.string().required("Print name is required"),
  })
  .required();
