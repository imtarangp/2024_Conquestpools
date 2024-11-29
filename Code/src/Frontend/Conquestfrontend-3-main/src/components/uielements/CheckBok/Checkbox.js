import React from "react";
import classes from "./style.module.css";
const Checkbox = ({
  label,
  errors,
  register,
  registerLabel,
  loading,
  ...props
}) => {
  const reg = registerLabel ? { ...register(`${registerLabel}`) } : null;
  return (
    <div className="mb-4 d-flex flex-row align-items-center">
      <div
        className={[
          classes["input-wrapper"],
          // "p-2",
          `${errors?.message && classes["error-border"]}`,
          `${loading && classes["disable-input"]}`,
        ].join(" ")}
      >
        <input
          type={"checkbox"}
          autoComplete="off"
          disabled={loading}
          {...reg}
          {...props}
          id={label}
        />
      </div>
      <div className="px-2">
        <label
          htmlFor={label}
          className={[classes["field-label"], "mb-0"].join(" ")}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
