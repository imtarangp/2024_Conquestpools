import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Dropdown from "../../uielements/Dropdown/Dropdown";
import TextArea from "../../uielements/TextArea/TextArea";
import BackButton from "../../uielements/BackButton/BackButton";
import SubmitButton from "../../uielements/SubmitButton/SubmitButton";
import { useSelector, useDispatch } from "react-redux";
import { submitStep3ValuesStartAsync } from "../../../store/actions/step3";
import { getManufacturingOptionsStartAsync } from "../../../store/actions/dropdowns";
import { step3Schema } from "../../../schemas/step3";
const Step3 = ({ setCurrStep }) => {
  const dispatch = useDispatch();
  const { isLoading, values } = useSelector((state) => state?.step3);
  const { isLoadingDropdown, manufacturingOptionsArray } = useSelector(
    (state) => state?.dropdowns
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    // resolver: yupResolver(step3Schema),
    defaultValues: {
      ...values,
    },
  });
  const onSubmit = (data) => {
    dispatch(submitStep3ValuesStartAsync(data, setCurrStep));
  };
  useEffect(() => {
    dispatch(getManufacturingOptionsStartAsync());
  }, []);
  const fittingsColourOptions = [
    { value: "white", label: "White" },
    { value: "grey", label: "Grey" },
    { value: "None", label: "None" },
  ];
  const spaHeightOptions = [
    { value: "Level With Pool", label: "Level With Pool" },
    { value: "Raised Above Pool", label: "Raised Above Pool" }
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
          <div className="row align-items-center">
            <div className="col-12 col-md-6">
              <Dropdown
                errors={errors["fittingsColour"]}
                label="Fittings Colour"
                control={control}
                name="fittingsColour"
                Controller={Controller}
                options={fittingsColourOptions}
              />
            </div>
            <div className="col-12 col-md-6">
              <Dropdown
                errors={errors["select-options"]}
                label="Select Options"
                control={control}
                name="select-options"
                Controller={Controller}
                options={manufacturingOptionsArray}
                isMulti
              />
            </div>
            <div className="col-12 col-md-12">
              <TextArea
                errors={errors["manufacturingNotes"]}
                label="Manufacturing Notes"
                loading={false}
                register={register}
                registerLabel="manufacturingNotes"
              />
            </div>
            <div className="col-12 col-md-6">
              <Dropdown
                errors={errors["spaHeight"]}
                label="Spa Height"
                control={control}
                name="spaHeight"
                Controller={Controller}
                options={spaHeightOptions}
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

export default Step3;
