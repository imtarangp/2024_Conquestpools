import React from "react";
import classes from "./style.module.css";
const Input = ({
  label,
  errors,
  register,
  registerLabel,
  loading,
  focussed,
  type,
  min,
  qty,
  inline,
  ...props
}) => (
  <div className="mb-4" style={{ position: "relative", display: inline ? "flex" : null }}>
      {inline
          ? (<p
              className={[classes["field-label"], "mb-0"].join(" ")}
              style={{flexGrow: 1, textWrap: "nowrap", textAlign: "right", alignSelf: "center", paddingRight: 8}}>
              {label}
             </p>)
          : (<div>
              <p className={[classes["field-label"], "mb-0"].join(" ")}>{label}</p>
             </div>)}
    <div
      className={[
        classes["input-wrapper"],
        "p-2",
        `${errors?.message && classes["error-border"]}`,
        `${loading && classes["disable-input"]}`,
      ].join(" ")}
      style={{display: inline ? "inline" : null}}
    >
      <input
        type={type}
        min={min}
        autoFocus={focussed}
        autoComplete="off"
        disabled={loading}
        style={inline ? {width: 48, minWidth: 48, maxWidth: 48} : {}}
        {...register(`${registerLabel}`)}
      />
    </div>
    {errors?.message && (
      <div className={classes["error-text-wrapper"]}>
        <p className={["mb-0", classes["error-text"]].join(" ")}>
          {qty
            ? "Min 1"
            : registerLabel === "isPoolMeetingCraneTime"
            ? "Required"
            : errors?.message}
        </p>
      </div>
    )}
  </div>
);

export default Input;
