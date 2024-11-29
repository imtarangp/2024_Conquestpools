import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../../uielements/Input/Input";
import Dropdown from "../../uielements/Dropdown/Dropdown";
import TextArea from "../../uielements/TextArea/TextArea";
import BackButton from "../../uielements/BackButton/BackButton";
import SubmitButton from "../../uielements/SubmitButton/SubmitButton";
import { submitStep2ValuesStartAsync } from "../../../store/actions/step2";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getBlanketRollerStartAsync,
  getHandeoverKitStartAsync,
  getHeatingStartAsync,
  getPipeStartAsync,
  getPoolLightsStartAsync,
  getPoolSaltStartAsync,
  getSkimmerStartAsync,
  getSpaJetsStartAsync,
  getTransformerStartAsync,
} from "../../../store/actions/dropdowns";
import { submitStep4ValuesStartAsync } from "../../../store/actions/step4";
import { components } from "react-select";
import classes from "./style.module.css";

const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

const OptionWithPrice = (props) => {
  return (
    <components.Option {...props}>
      <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        <div style={{ flexGrow: 1 }}>{props.data.name ?? props.data.item}</div>
        <div
          style={{
            marginLeft: 4,
            paddingLeft: 8,
            alignSelf: "center",
            width: 64,
            minWidth: 64,
            maxWidth: 64,
            borderLeft: "2px solid lightgray",
          }}
        >
          ${props.data.cost}
        </div>
      </div>
    </components.Option>
  );
};

const OptionValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>{children}</components.SingleValue>
);

const Step2 = ({ setCurrStep }) => {
  const dispatch = useDispatch();
  const { isLoading, values } = useSelector((state) => state?.step2);
  const { values: prePlumbValues } = useSelector((state) => state?.step4);
  const {
    isLoadingDropdown,
    skimmerRawArray,
    poolLightsRawArray,
    transformerRawArray,
    spaJetsArray,
    pipeRawArray,
    heatingArray,
    blanketRollerRawArray,
    handoverKitRawArray,
    poolSaltRawArray,
  } = useSelector((state) => state?.dropdowns);
  useEffect(() => {
    dispatch(getSkimmerStartAsync());
    dispatch(getPoolLightsStartAsync());
    dispatch(getTransformerStartAsync());
    dispatch(getSpaJetsStartAsync());
    dispatch(getPipeStartAsync());
    dispatch(getHeatingStartAsync());
    dispatch(getBlanketRollerStartAsync());
    dispatch(getHandeoverKitStartAsync());
    dispatch(getPoolSaltStartAsync());
  }, []);

  console.log("prePlumbValues: ", prePlumbValues);

  const { resubValues } = useSelector((state) => state?.reSubmit);
  const { state } = useLocation();

  const getObjVal = (val, arr) => {
    let value;
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.label === val) value = element;
    }
    return value;
  };

  const defaulValues =
    state?.type === "resub"
      ? {
          ...resubValues,
          skimmer: getObjVal(resubValues.skimmer, skimmerRawArray),
          poolLights: getObjVal(resubValues.poolLights, poolLightsRawArray),
          transformer: getObjVal(resubValues.transformer, transformerRawArray),
          spaJets: getObjVal(resubValues.spaJets, spaJetsArray),
          pipeing: getObjVal(resubValues.pipeing, pipeRawArray),
          pipeing2: getObjVal(resubValues.pipeing2, pipeRawArray),
          heating: getObjVal(resubValues.heating, heatingArray),
          blanketRoller: getObjVal(
            resubValues.blanketRoller,
            blanketRollerRawArray
          ),
          handoverKit: getObjVal(resubValues.handoverKit, handoverKitRawArray),
          poolSalt: getObjVal(resubValues.poolSalt, poolSaltRawArray),
          // slotDate: moment(resubValues.slotDate).format("YYYY-DD-MM"),
        }
      : {
          poolLightsQty: 0,
          spaJetsQty: 0,
          pipeQty: 0,
          pipeing2Qty: 0,
          poolSaltQty: 0,
          spaJetHousingQty: 0,
          spaJetinternalQty: 0,
          spaWetKitQty: 0,
          spaVenturiKitQty: 0,
          brochuresQty: 0,
          eyeballWhiteQty: 0,
          eyeballGreyQty: 0,
          downJetWhiteQty: 0,
          downJetGreyQty: 0,
          suctionWhiteQty: 0,
          suctionGreyQty: 0,
          suctionClearQty: 0,
          beamTiesQty: 0,
          fortymm90degElbowWhiteQty: 0,
          fortymm45degElbowWhiteQty: 0,
          fortymmTeeWhiteQty: 0,
          fiftymm90degElbowWhiteQty: 0,
          fiftymm45degElbowWhiteQty: 0,
          fiftymmTeeWhiteQty: 0,
          clearPrimerQty: 0,
          redPrimerQty: 0,
          clearGlueQty: 0,
          greenGlueQty: 0,
          maxisilSiliconWhiteQty: 0,
          maxisilSiliconClearQty: 0,
          infloorGearsQty: 0,
          infloorImpellarQty: 0,
          infloorValveLidQty: 0,
          infloorValveORingQty: 0,
          infloorValveSteelClampQty: 0,
          infloorValveCompleteQty: 0,
          infloorJetWhiteQty: 0,
          infloorJetGreyQty: 0,
          infloorToolQty: 0,
          ultraquestSkimmerBasketQty: 0,
          ultraquestWeirDoorQty: 0,
          ultraquestVacPlateQty: 0,
          ultraquestSkimmerLidBeigeQty: 0,
          ultraquestSkimmerLidGreyQty: 0,
          blanketStrapQty: 0,
          ...values,
        };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      ...defaulValues,
    },
  });

  const onSubmit = (data) => {
    // Ensure data and data.skimmer are defined before accessing their properties
    if (data && data.skimmer && data.skimmer.value) {
      prePlumbValues.cutSkimmer =
        data.skimmer.value === 7 || data.skimmer.value === 4
          ? yesNoOptions[1]
          : data.skimmer.value === 1
          ? yesNoOptions[0]
          : {};
    } else {
      // data.skimmer is not defined
      prePlumbValues.cutSkimmer = {};
    }

    dispatch(submitStep2ValuesStartAsync(data, setCurrStep));
    dispatch(submitStep4ValuesStartAsync(prePlumbValues));
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
          disabled={isLoading || isLoadingDropdown}
        >
          <div className="row align-items-end">
            <div className="col-12 col-md-4">
              <Dropdown
                errors={errors["skimmer"]}
                label="Skimmer"
                control={control}
                name="skimmer"
                Controller={Controller}
                options={skimmerRawArray}
                components={{
                  Option: OptionWithPrice,
                  SingleValue: OptionValue,
                }}
              />
            </div>
            <div className="col-12 col-md-6">
              <Dropdown
                errors={errors["poolLights"]}
                label="Pool Lights"
                control={control}
                name="poolLights"
                Controller={Controller}
                options={poolLightsRawArray}
                components={{
                  Option: OptionWithPrice,
                  SingleValue: OptionValue,
                }}
              />
            </div>
            <div className="col-12 col-md-2">
              <Input
                type="number"
                min={0}
                register={register}
                registerLabel="poolLightsQty"
                errors={errors["poolLightsQty"]}
                label="Pool lights qty."
                loading={false}
                qty
              />
            </div>
            <div className="col-12 col-md-10">
              <Dropdown
                errors={errors["pipeing"]}
                label="Pipe 40mm"
                control={control}
                name="pipeing"
                Controller={Controller}
                options={pipeRawArray}
                components={{
                  Option: OptionWithPrice,
                  SingleValue: OptionValue,
                }}
              />
            </div>
            <div className="col-12 col-md-2">
              <Input
                type="number"
                min={0}
                register={register}
                registerLabel="pipeQty"
                errors={errors["pipeQty"]}
                label="Pipe 1 qty."
                loading={false}
                qty
              />
            </div>
            <div className="col-12 col-md-10">
              <Dropdown
                errors={errors["pipeing2"]}
                label="Pipe 50mm"
                control={control}
                name="pipeing2"
                Controller={Controller}
                options={pipeRawArray}
                components={{
                  Option: OptionWithPrice,
                  SingleValue: OptionValue,
                }}
              />
            </div>
            <div className="col-12 col-md-2">
              <Input
                type="number"
                min={0}
                register={register}
                registerLabel="pipeing2Qty"
                errors={errors["pipeing2Qty"]}
                label="Pipe 2 qty."
                loading={false}
                qty
              />
            </div>
            <div className="col-12 col-md-4">
              <Dropdown
                errors={errors["blanketRoller"]}
                label="Blanket / Roller"
                control={control}
                name="blanketRoller"
                Controller={Controller}
                options={blanketRollerRawArray}
                components={{
                  Option: OptionWithPrice,
                  SingleValue: OptionValue,
                }}
              />
            </div>
            <div className="col-12 col-md-4">
              <Dropdown
                errors={errors["handoverKit"]}
                label="Handover Kit"
                control={control}
                name="handoverKit"
                Controller={Controller}
                options={handoverKitRawArray}
                components={{
                  Option: OptionWithPrice,
                  SingleValue: OptionValue,
                }}
              />
            </div>
            <div className="col-12 col-md-4">
              <Dropdown
                errors={errors["transformer"]}
                label="Transformer"
                control={control}
                name="transformer"
                Controller={Controller}
                options={transformerRawArray}
                components={{
                  Option: OptionWithPrice,
                  SingleValue: OptionValue,
                }}
              />
            </div>
            <div className="col-12 col-md-10">
              <Dropdown
                errors={errors["poolSalt"]}
                label="Pool Salt"
                control={control}
                name="poolSalt"
                Controller={Controller}
                options={poolSaltRawArray}
                components={{
                  Option: OptionWithPrice,
                  SingleValue: OptionValue,
                }}
              />
            </div>
            <div className="col-12 col-md-2">
              <Input
                type="number"
                min={0}
                register={register}
                registerLabel="poolSaltQty"
                errors={errors["poolSaltQty"]}
                label="Pool Salt qty."
                loading={false}
                qty
              />
            </div>

            <div>
              <div className={classes["numeric-fields-grid"]}>
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="spaJetHousingQty"
                  errors={errors["spaJetHousingQty"]}
                  label="Spa jet housing qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="spaJetinternalQty"
                  errors={errors["spaJetinternalQty"]}
                  label="Spa jet internal qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="spaWetKitQty"
                  errors={errors["spaWetKitQty"]}
                  label="Spa wet kit qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="spaVenturiKitQty"
                  errors={errors["spaVenturiKitQty"]}
                  label="Spa venturi kit qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="brochuresQty"
                  errors={errors["brochuresQty"]}
                  label="Brochures qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="eyeballWhiteQty"
                  errors={errors["eyeballWhiteQty"]}
                  label="Eyeball white qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="eyeballGreyQty"
                  errors={errors["eyeballGreyQty"]}
                  label="Eyeball grey qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="downJetWhiteQty"
                  errors={errors["downJetWhiteQty"]}
                  label="Down jet white qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="downJetGreyQty"
                  errors={errors["downJetGreyQty"]}
                  label="Down jet grey qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="suctionWhiteQty"
                  errors={errors["suctionWhiteQty"]}
                  label="Suction white qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="suctionGreyQty"
                  errors={errors["suctionGreyQty"]}
                  label="Suction grey qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="suctionClearQty"
                  errors={errors["suctionClearQty"]}
                  label="Suction clear qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="beamTiesQty"
                  errors={errors["beamTiesQty"]}
                  label="Beam ties qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="fortymm90degElbowWhiteQty"
                  errors={errors["fortymm90degElbowWhiteQty"]}
                  label="40mm 90deg elbow white qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="fortymm45degElbowWhiteQty"
                  errors={errors["fortymm45degElbowWhiteQty"]}
                  label="40mm 45deg elbow white qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="fortymmTeeWhiteQty"
                  errors={errors["fortymmTeeWhiteQty"]}
                  label="40mm tee white qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="fiftymm90degElbowWhiteQty"
                  errors={errors["fiftymm90degElbowWhiteQty"]}
                  label="50mm 90deg elbow white qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="fiftymm45degElbowWhiteQty"
                  errors={errors["fiftymm45degElbowWhiteQty"]}
                  label="50mm 45deg elbow white qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="fiftymmTeeWhiteQty"
                  errors={errors["fiftymmTeeWhiteQty"]}
                  label="50mm tee white qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="clearPrimerQty"
                  errors={errors["clearPrimerQty"]}
                  label="Clear primer qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="redPrimerQty"
                  errors={errors["redPrimerQty"]}
                  label="Red primer qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="clearGlueQty"
                  errors={errors["clearGlueQty"]}
                  label="Clear glue qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="greenGlueQty"
                  errors={errors["greenGlueQty"]}
                  label="Green glue qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="maxisilSiliconWhiteQty"
                  errors={errors["maxisilSiliconWhiteQty"]}
                  label="Max silicon white qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="maxisilSiliconClearQty"
                  errors={errors["maxisilSiliconClearQty"]}
                  label="Max silicon clear qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="infloorGearsQty"
                  errors={errors["infloorGearsQty"]}
                  label="Infloor gears qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="infloorImpellarQty"
                  errors={errors["infloorImpellarQty"]}
                  label="Infloor impellar qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="infloorValveLidQty"
                  errors={errors["infloorValveLidQty"]}
                  label="Infloor valve lid qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="infloorValveORingQty"
                  errors={errors["infloorValveORingQty"]}
                  label="Infloor valve or ring qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="infloorValveSteelClampQty"
                  errors={errors["infloorValveSteelClampQty"]}
                  label="Infloor valve steel clamp qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="infloorValveCompleteQty"
                  errors={errors["infloorValveCompleteQty"]}
                  label="Infloor valve complete qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="infloorJetWhiteQty"
                  errors={errors["infloorJetWhiteQty"]}
                  label="Infloor jet white qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="infloorJetGreyQty"
                  errors={errors["infloorJetGreyQty"]}
                  label="Infloor jet grey qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="infloorToolQty"
                  errors={errors["infloorToolQty"]}
                  label="Infloor tool qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="ultraquestSkimmerBasketQty"
                  errors={errors["ultraquestSkimmerBasketQty"]}
                  label="Ultraquest skimmer basket qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="ultraquestWeirDoorQty"
                  errors={errors["ultraquestWeirDoorQty"]}
                  label="Ultraquest weir door qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="ultraquestVacPlateQty"
                  errors={errors["ultraquestVacPlateQty"]}
                  label="Ultraquest vac plate qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="ultraquestSkimmerLidBeigeQty"
                  errors={errors["ultraquestSkimmerLidBeigeQty"]}
                  label="Ultraquest skimmer lid beige qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="ultraquestSkimmerLidGreyQty"
                  errors={errors["ultraquestSkimmerLidGreyQty"]}
                  label="Ultraquest skimmer lid grey qty."
                  loading={false}
                  qty
                />
                <Input
                  type="number"
                  min={0}
                  inline={true}
                  register={register}
                  registerLabel="blanketStrapQty"
                  errors={errors["blanketStrapQty"]}
                  label="Blanket strap qty."
                  loading={false}
                  qty
                />
              </div>
            </div>

            <div className="col-12 col-md-12">
              <TextArea
                errors={errors["accAditionalOptions"]}
                label="Additional Options"
                loading={false}
                register={register}
                registerLabel="accAditionalOptions"
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

export default Step2;
