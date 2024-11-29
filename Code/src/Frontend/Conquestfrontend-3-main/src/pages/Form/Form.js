import React, { useState } from "react";
import Step1 from "../../components/FormSteps/Step1/Step1";
import Step2 from "../../components/FormSteps/Step2/Step2";
import Step3 from "../../components/FormSteps/Step3/Step3";
import Step4 from "../../components/FormSteps/Step4/Step4";
import Step5 from "../../components/FormSteps/Step5/Step5";
import Step7 from "../../components/FormSteps/Step7/Step7";
import Step8 from "../../components/FormSteps/Step8/Step8";
import LeftNavbar from "../../components/LeftNavBar/LeftNavbar";
import {
  AiOutlineCheck,
  AiOutlineWarning,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import Header from "../../components/Header/Header";

const Form = () => {
  const [currStep, setCurrStep] = useState(1);
  const steps = [
    {
      stepNo: 1,
      Component: Step1,
      title: "Customer & Pool Details",
    },
    {
      stepNo: 2,
      Component: Step2,
      title: "Pool Accessories",
    },
    {
      stepNo: 3,
      Component: Step3,
      title: "Manufacturing",
    },
    {
      stepNo: 4,
      Component: Step4,
      title: "Pre Plumb",
    },
    {
      stepNo: 5,
      Component: Step5,
      title: "Diagram",
    },
    // {
    //   stepNo: 6,
    //   Component: Step6,
    //   title: "Signature",
    // },
    {
      stepNo: 6,
      Component: Step7,
      title: "Preview",
    },
    {
      stepNo: 7,
      Component: Step8,
      title: "Submitted",
    },
  ];

  return (
    <>
      <Header />
      <div>
        <div className="container-fluid px-5">
          <div className="row">
            <LeftNavbar />
            <div className="col-12 col-md-10 d-flex flex-column">
              <div className="d-flex mb-5">
                {steps
                  ?.filter(({ stepNo }) => stepNo !== 8)
                  ?.map(({ stepNo, title }) => (
                    <div className="d-flex align-items-center" key={stepNo}>
                      <div className="d-flex align-items-center">
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            width: 30,
                            height: 30,
                            background:
                              currStep === stepNo || currStep > stepNo
                                ? "#08467f"
                                : "#ccc",
                            border: currStep === stepNo && "solid 1px #6200ff",
                          }}
                        >
                          {currStep > stepNo ? (
                            <AiOutlineCheck
                              color={"#fff"}
                              size={15}
                              fontWeight="bold"
                            />
                          ) : currStep === stepNo ? (
                            <AiOutlineWarning
                              color={"#fff"}
                              size={15}
                              fontWeight="bold"
                            />
                          ) : (
                            <AiOutlineQuestionCircle
                              color={"#000"}
                              size={15}
                              fontWeight="bold"
                            />
                          )}
                        </div>
                        <div>
                          <p className="mb-0 px-2" style={{ fontSize: 12 }}>
                            {title}
                          </p>
                        </div>
                      </div>
                      {stepNo !== 7 && (
                        <span
                          style={{
                            height: 0,
                            width: 50,
                            border:
                              currStep > stepNo
                                ? "solid 1px #6200ff"
                                : "solid 1px #ccc",
                            margin: "0px 7px",
                          }}
                        ></span>
                      )}
                    </div>
                  ))}
              </div>
              {steps
                ?.filter(({ stepNo }) => stepNo === currStep)
                ?.map(({ Component }, i) => (
                  <Component
                    key={i}
                    currStep={currStep}
                    setCurrStep={setCurrStep}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
