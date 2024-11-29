import React from "react";
import Select from "react-select";
import classes from "./style.module.css";
const Dropdown = ({
  label,
  register,
  registerLabel,
  errors,
  Controller,
  control,
  name,
  options,
  isMulti,
  ...props
}) => {
  return (
    <div className="mb-4" style={{ position: "relative" }}>
      <div>
        <p className={[classes["field-label"], "mb-0"].join(" ")}>{label}</p>
      </div>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              isMulti={isMulti}
              {...field}
              options={options}
              styles={{
                control: (base, state) => ({
                  ...base,
                  border: errors?.message ? "solid 1px red" : "solid 1px #ccc",
                  boxShadow: "none",
                }),
              }}
              className={[classes["dropdown-field"]].join(" ")}
              {...props}
            />
          )}
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

export default Dropdown;
