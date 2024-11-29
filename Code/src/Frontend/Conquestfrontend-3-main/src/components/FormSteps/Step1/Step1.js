import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../uielements/Input/Input";
import DateInput from "../../uielements/Date/Date";
import Dropdown from "../../uielements/Dropdown/Dropdown";
import BackButton from "../../uielements/BackButton/BackButton";
import SubmitButton from "../../uielements/SubmitButton/SubmitButton";
import { useSelector, useDispatch } from "react-redux";
import {
  getOrderPolicyStartAsync,
  getPoolColourStartAsync,
  getPoolShapeStartAsync,
} from "../../../store/actions/dropdowns";
import { step1Schema } from "../../../schemas/step1";
import { useLocation } from "react-router-dom";
import { submitStep1ValuesStartAsync } from '../../../store/actions/step1';

const Step1 = ({ currStep, setCurrStep }) => {
  const stateOptions = [
    { value: "ACT", label: "ACT" },
    { value: "NSW", label: "NSW" },
    { value: "NT", label: "NT" },
    { value: "SA", label: "SA" },
    { value: "TAS", label: "TAS" },
    { value: "VIC", label: "VIC" },
    { value: "WA", label: "WA" },
  ];
  const getObjVal = (val, arr) => {
    let value;
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.label === val) value = element;
    }
    return value;
  };
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [date, setDate] = useState("");

  const { isLoading, values } = useSelector((state) => state?.step1);
  const { resubValues } = useSelector((state) => state?.reSubmit);
  const { isLoadingDropdown, poolColourArray, poolShapeArray, orderPolicy } = useSelector(
    (state) => state?.dropdowns
  );

  console.log('orderPolicy: ', orderPolicy);

  const defaulValues =
    state?.type === "resub"
      ? {
          ...values,
          poolColour: !!values?.poolColour?.label
            ? values?.poolColour
            : getObjVal(values?.poolColour, poolColourArray),
          state: !!values?.state?.label
            ? values?.state
            : getObjVal(values?.state, stateOptions),
          poolShape: !!values?.poolShape?.label
            ? values?.poolShape
            : getObjVal(values?.poolShape, poolShapeArray),
        }
      : {
          isPoolMeetingCrane: null,
          dealer: null,
          isPoolMeetingCraneTime: null,
          dealerCollectingPool: null,
          poolDeliveredEarlytoSiteDate: null,
          poolDeliveredInAfternoon: null,
          conquestRequiredtoLiftPoolIntoHoleOnSite: null,
          ...values,
        };
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    resolver: yupResolver(step1Schema),
    defaultValues: {
      ...defaulValues,
    },
  });
  const vals = getValues();

  useEffect(() => {
    setDate(vals.slotDate);
  }, [vals]);

  const onSubmit = (data, e) => {
    dispatch(submitStep1ValuesStartAsync(data, setCurrStep));
  };
  useEffect(() => {
    // dispatch(getPoolSizeStartAsync());
    dispatch(getPoolColourStartAsync());
    dispatch(getPoolShapeStartAsync());
    dispatch(getOrderPolicyStartAsync())
  }, []);

  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  return (
    <div className="d-flex flex-column" style={{ flex: 1 }}>
      <form
        className="d-flex flex-column"
        style={{ flex: 1 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset
          className="d-flex flex-column"
          style={{ flex: 1 }}
          disabled={isLoading || isLoadingDropdown}
        >
          <div>
            <div className="row align-items-center">
              <div className="col-12 col-md-4">
                <Input
                  register={register}
                  registerLabel="customer"
                  errors={errors["customer"]}
                  label="Customer Surname"
                  loading={false}
                  focussed
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  errors={errors["customerMobileNumber"]}
                  label="Mobile Number"
                  loading={false}
                  register={register}
                  registerLabel="customerMobileNumber"
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  register={register}
                  registerLabel="customerEmail"
                  errors={errors["customerEmail"]}
                  label="Email"
                  loading={false}
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  errors={errors["customerDeliveryAddress"]}
                  label="Street Address"
                  loading={false}
                  register={register}
                  registerLabel="customerDeliveryAddress"
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  errors={errors["customerPostalAddress"]}
                  label="Postal Address"
                  loading={false}
                  register={register}
                  registerLabel="customerPostalAddress"
                />
              </div>

              <div className="col-12 col-md-4">
                <Input
                  register={register}
                  registerLabel="city"
                  errors={errors["city"]}
                  label="Suburb / City"
                  loading={false}
                />
              </div>
              <div className="col-12 col-md-4">
                <Dropdown
                  errors={errors["state"]}
                  label="State"
                  control={control}
                  name="state"
                  Controller={Controller}
                  options={stateOptions}
                />
              </div>
              <div className="col-12 col-md-4">
                <Input
                  errors={errors["postcode"]}
                  label="Postal Code"
                  loading={false}
                  register={register}
                  registerLabel="postcode"
                />
              </div>
              <div className="col-12 col-md-4">
                <DateInput
                  errors={errors["slotDate"]}
                  label="Slot Date"
                  loading={false}
                  register={register}
                  registerLabel="slotDate"
                  defautVal={values.slotDate}
                  orderPolicy={orderPolicy}
                />
              </div>
              <div className="col-12 col-md-4">
                <Dropdown
                  errors={errors["poolDeliveredEarlytoSite"]}
                  label="Can pool deliver early to site?"
                  control={control}
                  name="poolDeliveredEarlytoSite"
                  Controller={Controller}
                  options={yesNoOptions}
                />
              </div>
              <div className={["col-12", "col-md-4"].join(" ")}>
                <Dropdown
                  errors={errors["isPoolMeetingCrane"]}
                  label="Is pool meeting a crane?"
                  control={control}
                  name="isPoolMeetingCrane"
                  Controller={Controller}
                  options={yesNoOptions}
                />
              </div>
              {watch("isPoolMeetingCrane")?.label === "Yes" && (
                <>
                  <div className="col-12 col-md-4">
                    <Input
                      errors={errors["isPoolMeetingCraneTime"]}
                      register={register}
                      registerLabel="isPoolMeetingCraneTime"
                      label="Meeting Crane Time"
                      loading={false}
                    />
                  </div>
                </>
              )}
              <div className="col-12 col-md-4">
                <Dropdown
                  errors={errors["poolShape"]}
                  label="Pool Shape"
                  control={control}
                  name="poolShape"
                  Controller={Controller}
                  options={poolShapeArray}
                />
              </div>
              <div className="col-12 col-md-4">
                <Dropdown
                  errors={errors["poolColour"]}
                  label="Colour"
                  control={control}
                  name="poolColour"
                  Controller={Controller}
                  options={poolColourArray}
                />
              </div>
              <div className="col-12 col-md-4">
                <input
                  id="dealerCollectingPool"
                  className="form-check-input me-2"
                  type="checkbox"
                  name="dealerCollectingPool"
                  {...register("dealerCollectingPool")}
                />
                <label className="form-check-label" for="dealerCollectingPool">
                  Dealer Collecting Pool
                </label>
              </div>
            </div>
          </div>
          <div
            style={{ flex: 1 }}
            className="d-flex mt-5 justify-content-between align-items-end"
          >
            <div>
              <BackButton currStep={currStep} setCurrStep={setCurrStep} />
            </div>
            <div>
              <SubmitButton next />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Step1;
