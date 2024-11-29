import moment from "moment";
import React from "react";
import classes from "./style.module.css";

const DateInput = ({
  label,
  register,
  registerLabel,
  errors,
  loading,
  defautVal,
  orderPolicy,
  ...props
}) => {
  let minDate = 0;
  console.log(typeof orderPolicy)
  if (typeof orderPolicy === 'string') {
     minDate = orderPolicy?.split(" ")[0]
  }

  const nextWeek = moment().add(minDate, 'weeks').format('YYYY-MM-DD');
  return (
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
        <input
          type="date"
          autoComplete="off"
          disabled={loading}
          min={nextWeek}
          {...register(`${registerLabel}`)}
        />
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

export default DateInput;
