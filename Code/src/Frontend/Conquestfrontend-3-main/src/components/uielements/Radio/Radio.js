import React from "react";
import classes from "./style.module.css";
const Radio = ({
  label,
  register,
  registerLabel,
  name,
  errors,
  loading,
  options = [],
  ...props
}) => {
  const reg = registerLabel ? { ...register(`${registerLabel}`) } : null;
  return (
    <div className="mb-4" style={{ position: "relative" }}>
      <div>
        <p className={[classes["field-label"], "mb-0"].join(" ")}>{label}</p>
      </div>
      <div className="d-flex">
        {options?.map(({ otpLabel }, i) => (
          <div
            className={[
              classes["input-wrapper"],
              `${i > 0 && "mx-5"}`,
              // "p-2",
              `${errors?.message && classes["error-border"]}`,
              `${loading && classes["disable-input"]}`,
            ].join(" ")}
            key={i}
          >
            <div>
              <label htmlFor={otpLabel} className="mb-0">
                {otpLabel}
              </label>
            </div>

            <div>
              <input
                id={otpLabel}
                name={name}
                type={"radio"}
                value={otpLabel}
                autoComplete="off"
                disabled={loading}
                {...reg}
              />
            </div>
          </div>
        ))}
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
};

export default Radio;
