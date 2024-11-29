import * as yup from "yup";
const phoneRegex =
  /^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){7,9}$/;
export const step1Schema = yup
  .object({
    customer: yup.string().required("Required"),
    customerMobileNumber: yup
      .string()
      .matches(phoneRegex, "Phone number is not valid")
      .required("Phone number is required"),
    customerEmail: yup.string().email().required("Required"),
    customerDeliveryAddress: yup.string().required("Required"),
    customerPostalAddress: yup.string().required("Required"),
    city: yup.string().required("Required"),
    state: yup.object().required("Required").nullable(),
    postcode: yup
      .string()
      .min(4, "Must be 4 characters")
      .max(4, "Must be 4 characters")
      .required("Required"),
    slotDate: yup.string().required("Required"),
    poolDeliveredEarlytoSite: yup.object().required("Required").nullable(),
    poolDeliveredInAfternoon: yup.object().nullable(),
    conquestRequiredtoLiftPoolIntoHoleOnSite: yup.object().nullable(),
    poolShape: yup.object().required("Required").nullable(),
    poolColour: yup.object().required("Required").nullable(),
  })
  .required();
