import React from "react";
import { useForm, Controller } from "react-hook-form";
import Dropdown from "../../uielements/Dropdown/Dropdown";
import TextArea from "../../uielements/TextArea/TextArea";
import BackButton from "../../uielements/BackButton/BackButton";
import SubmitButton from "../../uielements/SubmitButton/SubmitButton";
import { useSelector, useDispatch } from "react-redux";
import { submitStep4ValuesStartAsync } from "../../../store/actions/step4";

const prePlumbOptions = [
  { value: "std pre plumb", label: "Std Pre Plumb" },
  { value: "infloor pre plumb", label: "Infloor Pre Plumb" },
  { value: "none", label: "None" },
];
const pumpSystemOptions = [
  { value: "1 pump system", label: "1 Pump System" },
  { value: "2 pump system", label: "2 Pump System" },
];
const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const Step4 = ({ setCurrStep }) => {
  const dispatch = useDispatch();
  const { isLoading, values } = useSelector((state) => state?.step4);

  const {
    values: { skimmer },
  } = useSelector((state) => state.step2);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      ...values,
    },
  });

  const onSubmit = (data) => {
    dispatch(submitStep4ValuesStartAsync(data, setCurrStep));
  };

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
          disabled={isLoading}
        >
          <div className="row">
            <div className="col-12 col-md-4">
              <Dropdown
                errors={errors["prePlumb"]}
                label="Pre Plumb"
                control={control}
                name="prePlumb"
                Controller={Controller}
                options={prePlumbOptions}
              />
            </div>
            <div className="col-12 col-md-4">
              <Dropdown
                errors={errors["stdPrePlumb"]}
                label="Pump System"
                control={control}
                name="stdPrePlumb"
                Controller={Controller}
                options={pumpSystemOptions}
              />
            </div>
            <div className="col-12 col-md-4">
              <Dropdown
                errors={errors["trimPoolOnly"]}
                label="Trim Pool Only"
                control={control}
                name="trimPoolOnly"
                Controller={Controller}
                options={yesNoOptions}
              />
            </div>

            <div className="col-12 col-md-4">
              <Dropdown
                errors={errors["cutSkimmer"]}
                label="Cut Skimmer"
                control={control}
                name="cutSkimmer"
                Controller={Controller}
                options={yesNoOptions}
                isDisabled={
                  skimmer?.value === 7 || skimmer?.value === 4 ? true : false
                }
                defaultValue={
                  skimmer?.value === 7 || skimmer?.value === 4
                    ? yesNoOptions[1]
                    : skimmer?.value === 1
                    ? yesNoOptions[0]
                    : null
                }
              />
            </div>
            <div className="col-12 col-md-4">
              <Dropdown
                errors={errors["installHydro"]}
                label="Install Hydro"
                control={control}
                name="installHydro"
                Controller={Controller}
                options={yesNoOptions}
              />
            </div>
            <div className="col-12 col-md-4">
              <Dropdown
                errors={errors["cutHydro"]}
                label="Cut Hydro"
                control={control}
                name="cutHydro"
                Controller={Controller}
                options={yesNoOptions}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextArea
                errors={errors["otherInstructions"]}
                label="Other Instructions"
                loading={false}
                register={register}
                registerLabel="otherInstructions"
              />
            </div>
          </div>
          <div
            style={{ flex: 1 }}
            className="d-flex mt-5 justify-content-between align-items-end"
          >
            <div>
              <BackButton setCurrStep={setCurrStep} />
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

export default Step4;
