import React from "react";
import classes from "./style.module.css";
const BackButton = ({ currStep, setCurrStep }) => {
  const handleClickBack = () => {
    setCurrStep((ps) => ps - 1);
  };
  return (
    <div
      disabled={currStep === 1}
      className={
        currStep === 1
          ? classes["back-button-disabled"]
          : classes["back-button"]
      }
      onClick={handleClickBack}
    >
      Previous
    </div>
  );
};

export default BackButton;
