import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import {
  clearSignatureStartAsync,
  reSubmitFormStartAsync,
  submitSignatureStartAsync,
} from "../../../store/actions/finalStep";
// import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { finalForm } from "../../../services/finalFormReform";
import { submitFormStartAsync } from "../../../store/actions/finalStep";
import { CanvasPreview } from "../../CanvasPreview/CanvasPreview";
import BackButton from "../../uielements/BackButton/BackButton";
import SubmitButton from "../../uielements/SubmitButton/SubmitButton";
import classes from "./style.module.css";
import { useForm } from "react-hook-form";
import Input from "../../uielements/Input/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { step7Schema } from "../../../schemas/step7";

const conditionalRender = ({ label, value }) => {
  if (!!value)
    return (
      <div className="col-4">
        <div className="d-flex">
          <p>
            {label} : {value}
          </p>
        </div>
      </div>
    );
  else return null;
};
const Step7 = ({ setCurrStep }) => {
  const { state } = useLocation();
  const sign1Ref = useRef(null);
  let data = "";
  let dataUrl = "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(step7Schema),
  });

  const save = () => {
    // if (sign1Ref.current.isEmpty()) {
    //   alert("Please Insert Your Signature");
    //   return;
    // } else {
    data = sign1Ref.current.toData();
    dataUrl = sign1Ref.current.toDataURL();
    dispatch(submitSignatureStartAsync(data, dataUrl, setCurrStep));
    // }
  };
  useEffect(() => {
    if (!!finalStepVals?.signature) {
      sign1Ref.current.fromData(finalStepVals?.signature);
    }
  }, []);

  const dispatch = useDispatch();
  const step1Vals = useSelector((state) => state?.step1);
  const step2Vals = useSelector((state) => state?.step2);
  const step3Vals = useSelector((state) => state?.step3);
  const step4Vals = useSelector((state) => state?.step4);

  const finalStepVals = useSelector((state) => state?.finalStep);
  const [resubmitSignExist, setResubmitSignExist] = useState(false);

  useEffect(() => {
    if (state?.type === "resub" && finalStepVals?.signatureURL) {
      setResubmitSignExist(true);
    }
  }, []);

  const onSubmit = (formData) => {
    if (resubmitSignExist) {
      dispatch(
        reSubmitFormStartAsync(
          finalForm(step1Vals, step2Vals, step3Vals, step4Vals, finalStepVals),
          state.orderId,
          finalStepVals?.signatureURL,
          setCurrStep
        )
      );
    } else {
      if (sign1Ref.current.isEmpty()) {
        alert("Please Insert Your Signature");
        return;
      } else {
        save();
        if (state?.type === "resub") {
          dispatch(
            reSubmitFormStartAsync(
              finalForm(
                step1Vals,
                step2Vals,
                step3Vals,
                step4Vals,
                finalStepVals,
                formData.printName
              ),

              state.orderId,
              sign1Ref.current.toDataURL(),
              setCurrStep
            )
          );
        } else {
          dispatch(
            submitFormStartAsync(
              finalForm(
                step1Vals,
                step2Vals,
                step3Vals,
                step4Vals,
                finalStepVals,
                formData.printName
              ),
              sign1Ref.current.toDataURL(),
              setCurrStep
            )
          );
        }
      }
    }
  };

  const handleClearResubSign = () => {
    setResubmitSignExist(false);
    dispatch(clearSignatureStartAsync());
  }

  return (
    <form
      className="d-flex flex-column"
      onSubmit={handleSubmit(onSubmit)}
      style={{ flex: 1 }}
    >
      <h1>Preview</h1>
      <div
        // className="d-flex justify-content-center align-items-center"
        className="p-4"
        style={{
          border: "solid 2px #6200ff",
          flex: 1,
          maxHeight: 600,
          overflow: "auto",
        }}
      >
        <p>
          <strong>1. Customer & Pool Details</strong>
        </p>
        <div className="row">
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Customer : {step1Vals?.values?.customer}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Email : {step1Vals?.values?.customerEmail}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Contact Number : {step1Vals?.values?.customerMobileNumber}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Postal Addres : {step1Vals?.values?.customerPostalAddress}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Delivery Address: {step1Vals?.values?.customerDeliveryAddress}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Suburb / City: {step1Vals?.values?.suburb}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                State: {step1Vals?.values?.state?.label}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Post Code: {step1Vals?.values?.postcode}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Slot Date : {step1Vals?.values?.slotDate}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Pool Delivered Early To Site :
                {step1Vals?.values?.poolDeliveredEarlytoSite?.label}
              </p>
            </div>
          </div>
          {step1Vals?.values?.poolDeliveredEarlytoSite?.label === "Yes" && (
            <div className="col-4">
              <div className="d-flex">
                <p>
                  Pool Delivered Early To Site Date:
                  {step1Vals?.values?.poolDeliveredEarlytoSiteDate}
                </p>
              </div>
            </div>
          )}
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Pool Delivered In Afternoon :
                {step1Vals?.values?.poolDeliveredInAfternoon?.label}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Required To Lift Pool Into Hole On Site? :
                {
                  step1Vals?.values?.conquestRequiredtoLiftPoolIntoHoleOnSite
                    ?.label
                }
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Is Pool Meeting Crane :
                {step1Vals?.values?.isPoolMeetingCrane?.label}
              </p>
            </div>
          </div>
          {step1Vals?.values?.isPoolMeetingCrane?.label === "Yes" && (
            <div className="col-4">
              <div className="d-flex">
                <p>
                  Pool Delivered Early To Site Time:
                  {`${step1Vals?.values?.isPoolMeetingCraneTime}`}
                </p>
              </div>
            </div>
          )}
          {/* <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Pool Size : {step1Vals?.values?.poolSize?.label}
              </p>
            </div>
          </div> */}
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Pool Shape : {step1Vals?.values?.poolShape?.label}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Pool Colour : {step1Vals?.values?.poolColour?.label}
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Kitpool :
                {step1Vals?.values?.kitPool ? (
                  <AiOutlineCheck size={22} color="green" />
                ) : (
                  <AiOutlineCloseCircle size={22} color="red" />
                )}
              </p>
            </div>
          </div>
        </div>
        <p>
          <strong>2. Pool Accessories</strong>
        </p>
        <div className="row">
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Skimmer : {step2Vals?.values?.skimmer?.label}
              </p>
            </div>
          </div>
          {conditionalRender({
            label: "Pool Lights",
            value: step2Vals?.values?.poolLights?.label,
          })}
          {conditionalRender({
            label: "Pool Lights Qty",
            value: step2Vals?.values?.poolLightsQty,
          })}
          {conditionalRender({
            label: "Transformer",
            value: step2Vals?.values?.transformer?.label,
          })}
          {conditionalRender({
            label: "SPA Jet",
            value: step2Vals?.values?.spaJets?.label,
          })}
          {conditionalRender({
            label: "SPA Jet Qty",
            value: step2Vals?.values?.spaJetsQty,
          })}

          {conditionalRender({
            label: "Pipeing 1",
            value: step2Vals?.values?.pipeing?.label,
          })}
          {conditionalRender({
            label: "Pipeing 1 Qty",
            value: step2Vals?.values?.pipeQty,
          })}
          {conditionalRender({
            label: "Pipeing 2",
            value: step2Vals?.values?.pipeing2?.label,
          })}
          {conditionalRender({
            label: "Pipeing 2 Qty",
            value: step2Vals?.values?.pipeing2Qty,
          })}
          {conditionalRender({
            label: "Heating",
            value: step2Vals?.values?.heating?.label,
          })}
          {conditionalRender({
            label: "Blanket / Roller",
            value: step2Vals?.values?.blanketRoller?.label,
          })}
          {conditionalRender({
            label: "Handover Kit",
            value: step2Vals?.values?.handoverKit?.label,
          })}
          {conditionalRender({
            label: "Pool Salt",
            value: step2Vals?.values?.poolSalt?.label,
          })}
          {conditionalRender({
            label: "Pool Salt Qty",
            value: step2Vals?.values?.poolSaltQty,
          })}

          {conditionalRender({
            label: "Spa jet housing Qty",
            value: step2Vals?.values?.spaJetHousingQty,
          })}

          {conditionalRender({
            label: "Spa jet internal Qty",
            value: step2Vals?.values?.spaJetinternalQty,
          })}

          {conditionalRender({
            label: "Spa wet kit Qty",
            value: step2Vals?.values?.spaWetKitQty,
          })}

          {conditionalRender({
            label: "Spa venturi kit Qty",
            value: step2Vals?.values?.spaVenturiKitQty,
          })}

          {conditionalRender({
            label: "Brochures Qty",
            value: step2Vals?.values?.brochuresQty,
          })}

          {conditionalRender({
            label: "Eyeball white Qty",
            value: step2Vals?.values?.eyeballWhiteQty,
          })}

          {conditionalRender({
            label: "Eyeball grey Qty",
            value: step2Vals?.values?.eyeballGreyQty,
          })}

          {conditionalRender({
            label: "Down jet white Qty",
            value: step2Vals?.values?.downJetWhiteQty,
          })}

          {conditionalRender({
            label: "Down jet grey Qty",
            value: step2Vals?.values?.downJetGreyQty,
          })}

          {conditionalRender({
            label: "Suction white Qty",
            value: step2Vals?.values?.suctionWhiteQty,
          })}

          {conditionalRender({
            label: "Suction grey Qty",
            value: step2Vals?.values?.suctionGreyQty,
          })}

          {conditionalRender({
            label: "Suction clear Qty",
            value: step2Vals?.values?.suctionClearQty,
          })}

          {conditionalRender({
            label: "Beam ties Qty",
            value: step2Vals?.values?.beamTiesQty,
          })}

          {conditionalRender({
            label: "40mm 90deg elbow white Qty",
            value: step2Vals?.values?.fortymm90degElbowWhiteQty,
          })}

          {conditionalRender({
            label: "40mm 45deg elbow white Qty",
            value: step2Vals?.values?.fortymm45degElbowWhiteQty,
          })}

          {conditionalRender({
            label: "40mm tee white Qty",
            value: step2Vals?.values?.fortymmTeeWhiteQty,
          })}

          {conditionalRender({
            label: "50mm 90deg elbow white Qty",
            value: step2Vals?.values?.fiftymm90degElbowWhiteQty,
          })}

          {conditionalRender({
            label: "50mm 45deg elbow white Qty",
            value: step2Vals?.values?.fiftymm45degElbowWhiteQty,
          })}

          {conditionalRender({
            label: "50mm tee white Qty",
            value: step2Vals?.values?.fiftymmTeeWhiteQty,
          })}

          {conditionalRender({
            label: "Clear primer Qty",
            value: step2Vals?.values?.clearPrimerQty,
          })}

          {conditionalRender({
            label: "Red primer Qty",
            value: step2Vals?.values?.redPrimerQty,
          })}

          {conditionalRender({
            label: "Clear glue Qty",
            value: step2Vals?.values?.clearGlueQty,
          })}

          {conditionalRender({
            label: "Green glue Qty",
            value: step2Vals?.values?.greenGlueQty,
          })}

          {conditionalRender({
            label: "Max silicon white Qty",
            value: step2Vals?.values?.maxisilSiliconWhiteQty,
          })}

          {conditionalRender({
            label: "Max silicon clear Qty",
            value: step2Vals?.values?.maxisilSiliconClearQty,
          })}

          {conditionalRender({
            label: "Infloor gears Qty",
            value: step2Vals?.values?.infloorGearsQty,
          })}

          {conditionalRender({
            label: "Infloor impellar Qty",
            value: step2Vals?.values?.infloorImpellarQty,
          })}

          {conditionalRender({
            label: "Infloor valve lid Qty",
            value: step2Vals?.values?.infloorValveLidQty,
          })}

          {conditionalRender({
            label: "Infloor valve or ring Qty",
            value: step2Vals?.values?.infloorValveORingQty,
          })}

          {conditionalRender({
            label: "Infloor valve steel clamp Qty",
            value: step2Vals?.values?.infloorValveSteelClampQty,
          })}

          {conditionalRender({
            label: "Infloor valve complete Qty",
            value: step2Vals?.values?.infloorValveCompleteQty,
          })}

          {conditionalRender({
            label: "Infloor jet white Qty",
            value: step2Vals?.values?.infloorJetWhiteQty,
          })}

          {conditionalRender({
            label: "Infloor jet grey Qty",
            value: step2Vals?.values?.infloorJetGreyQty,
          })}

          {conditionalRender({
            label: "Infloor tool Qty",
            value: step2Vals?.values?.infloorToolQty,
          })}

          {conditionalRender({
            label: "Ultraquest skimmer basket Qty",
            value: step2Vals?.values?.ultraquestSkimmerBasketQty,
          })}

          {conditionalRender({
            label: "Ultraquest weir door Qty",
            value: step2Vals?.values?.ultraquestWeirDoorQty,
          })}

          {conditionalRender({
            label: "Ultraquest vac plate Qty",
            value: step2Vals?.values?.ultraquestVacPlateQty,
          })}

          {conditionalRender({
            label: "Ultraquest skimmer lid beige Qty",
            value: step2Vals?.values?.ultraquestSkimmerLidBeigeQty,
          })}

          {conditionalRender({
            label: "Ultraquest skimmer lid grey Qty",
            value: step2Vals?.values?.ultraquestSkimmerLidGreyQty,
          })}

          {conditionalRender({
            label: "Blanket strap Qty",
            value: step2Vals?.values?.blanketStrapQty,
          })}

          {conditionalRender({
            label: "Additional Optional",
            value: step2Vals?.values?.accAditionalOptions,
          })}
        </div>
        <p>
          <strong>3. Manufacturing</strong>
        </p>
        <div className="row">
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Fittings Colour : {step3Vals?.values?.fittingsColour?.label}
              </p>
            </div>
          </div>
          {!!step3Vals?.values["select-options"]?.length && (
            <div className="col-4">
              <div className="d-flex">
                <p>Options :</p>
                <ul>
                  {step3Vals?.values["select-options"]?.map(({ label }) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {conditionalRender({
            label: "Manufacturing Notes",
            value: step3Vals?.values?.manufacturingNotes,
          })}
          <div className="col-4">
            <div className="d-flex">
              <p className={classes["preview-label-val"]}>
                Spa Height : {step3Vals?.values?.spaHeight?.label}
              </p>
            </div>
          </div>
        </div>
        <p>
          <strong>4. Pre Plumb</strong>
        </p>
        <div className="row">
          {conditionalRender({
            label: "Pre Plumb",
            value: step4Vals?.values?.prePlumb?.label,
          })}
          {conditionalRender({
            label: "Pump System",
            value: step4Vals?.values?.stdPrePlumb?.label,
          })}
          {conditionalRender({
            label: "Pre Plumb With Solar Main Drain",
            value: step4Vals?.values?.prePlumbSolarMainDrain?.label,
          })}
          {conditionalRender({
            label: "Solar Suction Fittings",
            value: step4Vals?.values?.prePlumbSolarMainDrain?.label,
          })}
          {conditionalRender({
            label: "Trim Pool Only",
            value: step4Vals?.values?.trimPoolOnly?.label,
          })}
          {conditionalRender({
            label: "Cut Skimmer",
            value: step4Vals?.values?.cutSkimmer?.label,
          })}
          {conditionalRender({
            label: "Install Hydro",
            value: step4Vals?.values?.installHydro?.label,
          })}
          {conditionalRender({
            label: "Other Instructions",
            value: step4Vals?.values?.otherInstructions,
          })}
        </div>
        <div className="my-3 d-flex justify-content-center">
          <CanvasPreview diagram={finalStepVals?.diagram} />
        </div>
        <p className="mt-3">
          <strong>5. Signature</strong>
        </p>
        <div>
          <p>
            <strong>REVIEW & AUTHORISE : </strong>Please carefully review each
            line item. Once you have confirmed your order is true & correct,
            please sign below. Your signature declares the order submitted is
            true and correct.
          </p>
          {resubmitSignExist ? (
            <div className="d-flex justify-content-center">
              <div style={{ width: 600 }}>
                <div style={{ border: "solid 1px #ccc" }}>
                  {/* <SignatureCanvas
                    penColor="#800"
                    // minWidth={1000}
                    canvasProps={{
                      width: 600,
                      height: 200,
                      className: "sigCanvas",
                    }}
                    ref={sign1Ref}
                  /> */}
                  <img src={finalStepVals?.signatureURL} alt="Signature" />
                </div>
                <div className="mt-3 d-flex justify-content-center">
                  <button
                    onClick={handleClearResubSign}
                    className={[
                      classes["reset-button"],
                      classes["button"],
                    ].join(" ")}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center">
              <div style={{ width: 600 }}>
                <div className="col-12">
                  <Input
                    register={register}
                    registerLabel="printName"
                    errors={errors["printName"]}
                    label="Print Name"
                    loading={false}
                    focussed
                  />
                </div>
                <div style={{ border: "solid 1px #ccc" }}>
                  <SignatureCanvas
                    penColor="#800"
                    canvasProps={{
                      width: 600,
                      height: 200,
                      className: "sigCanvas",
                    }}
                    ref={sign1Ref}
                  />
                </div>
                <div className="mt-3 d-flex justify-content-center">
                  <button
                    onClick={() => sign1Ref.current.clear()}
                    className={[
                      classes["reset-button"],
                      classes["button"],
                    ].join(" ")}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* <div className="row">
          <div className="col-12">
            <img alt="sign" src={finalStepVals?.signatureURL} />
          </div>
        </div> */}
      </div>
      <div className="d-flex mt-5 my-4 justify-content-between align-items-end">
        <div>
          <BackButton setCurrStep={setCurrStep} />
        </div>
        <div>
          <SubmitButton disabled={finalStepVals?.isLoading} />
        </div>
      </div>
    </form>
  );
};

export default Step7;
