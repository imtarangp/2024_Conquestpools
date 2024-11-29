import React from "react";
import classes from "./style.module.css";
const SubmitButton = ({
  setCurrStep,
  auth,
  type,
  handleSubmit,
  disabled,
  next,
  title,
}) => {
  const handleClickSubmit = () => {
    setCurrStep((ps) => ps + 1);
  };
  return (
    <button
      type={type || "submit"}
      className={[
        auth ? classes["auth-submit-button"] : classes["submit-button"],
        disabled && classes["auth-submit-button-disabled"],
      ].join(" ")}
      onClick={type && handleSubmit}
      disabled={disabled}
    >
      {title
        ? title
        : disabled
        ? "Please Wait"
        : !disabled && next
        ? "Next"
        : "Submit"}
    </button>
  );
};

export default SubmitButton;
