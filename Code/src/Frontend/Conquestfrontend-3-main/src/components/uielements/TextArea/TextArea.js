import React from "react";
import classes from "./style.module.css";
const TextArea = ({
  label,
  errors,
  register,
  registerLabel,
  loading,
  focussed,
  type,
  min,
  ...props
}) => (
  <div className="mb-4" style={{ position: "relative" }}>
    <div>
      <p className={[classes["field-label"], "mb-0"].join(" ")}>{label}</p>
    </div>
    <div
      className={[
        classes["input-wrapper"],
        "p-2",
        `${errors?.message && classes["error-border"]}`,
        `${loading && classes["disable-input"]}`,
      ].join(" ")}
    >
      <textarea
        type={type}
        min={min}
        autoFocus={focussed}
        autoComplete="off"
        disabled={loading}
        {...register(`${registerLabel}`)}
        // rows={10}
        className={classes["text-area-field"]}
        rows={5}
        // {...props}
      ></textarea>
      {/* <input
      /> */}
    </div>
    {errors?.message && (
      <div className={classes["error-text-wrapper"]}>
        <p className={["mb-0", classes["error-text"]].join(" ")}>
          {errors?.message}
        </p>
      </div>
    )}
  </div>
);

export default TextArea;
