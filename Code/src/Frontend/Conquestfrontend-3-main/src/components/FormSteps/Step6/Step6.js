import React, { useEffect, useRef } from "react";
import classes from "./style.module.css";
import SignatureCanvas from "react-signature-canvas";
import { submitSignatureStartAsync } from "../../../store/actions/finalStep";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "../../uielements/BackButton/BackButton";
const Step6 = ({ setCurrStep }) => {
  const dispatch = useDispatch();
  const finalStepVals = useSelector((state) => state?.finalStep);
  const sign1Ref = useRef(null);
  let data = "";
  let dataUrl = "";
  const save = () => {
    if (sign1Ref.current.isEmpty()) {
      alert("Please Insert Your Signature");
      return;
    }
    data = sign1Ref.current.toData();
    dataUrl = sign1Ref.current.toDataURL();
    dispatch(submitSignatureStartAsync(data, dataUrl, setCurrStep));
  };
  useEffect(() => {
    if (!!finalStepVals?.signature) {
      sign1Ref.current.fromData(finalStepVals?.signature);
    }
  }, []);

  return (
    <div className="d-flex flex-column" style={{ flex: 1 }}>
      <div>
        <p>You need to sign it for submitting the document</p>
      </div>
      <div className="d-flex justify-content-center">
        <div style={{ width: 600 }}>
          <div style={{ border: "solid 1px #ccc" }}>
            <SignatureCanvas
              penColor="#800"
              // minWidth={1000}
              canvasProps={{
                width: 600,
                height: 200,
                className: "sigCanvas",
              }}
              ref={sign1Ref}
            />
          </div>
          <div className="mt-3 d-flex justify-content-center">
            <div className="mx-2">
              <BackButton setCurrStep={setCurrStep} />
            </div>
            <button
              onClick={() => sign1Ref.current.clear()}
              className={[classes["reset-button"], classes["button"]].join(" ")}
            >
              Reset
            </button>
            <button
              className={[
                classes["button"],
                classes["submit-button"],
                "mx-2",
              ].join(" ")}
              onClick={() => {
                save();
                // setCurrStep((ps) => ps + 1)
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* <div
        className="d-flex justify-content-center align-items-center"
        style={{ border: "solid 2px #6200ff", flex: 1 }}
      >
        <h1>Form has been submitted</h1>
      </div> */}
    </div>
  );
};

export default Step6;
