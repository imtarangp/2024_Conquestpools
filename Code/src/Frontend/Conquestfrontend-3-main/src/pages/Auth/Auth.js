import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import classes from "./style.module.css";
import Logo from "../../assets/images/Logo.png";
import Input from "../../components/uielements/Input/Input";
import SubmitButton from "../../components/uielements/SubmitButton/SubmitButton";
import { useDispatch, useSelector } from "react-redux";
import { authLoginStartAsync } from "../../store/actions/auth";
const Auth = () => {
  const { isLoadingAuth } = useSelector((state) => state?.auth);
  let navigate = useNavigate();
  const schema = yup
    .object({
      userName: yup.string().required("Required"),
      password: yup.string().required("Required"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      "kit-pool": true,
    },
  });
  const onSubmit = (data, e) => {
    dispatch(authLoginStartAsync(data, navigate));
  };
  const dispatch = useDispatch();

  return (
    <div
      className={[classes["login-page"], "d-flex", "align-items-center"].join(
        " "
      )}
    >
      <div className="col-12 col-md-4 offset-md-4">
        <div
          className={[
            classes["auth-form-component-wrapper"],
            "d-flex",
            "flex-column",
            "align-items-center",
          ].join(" ")}
        >
          <div className={classes["logo-wrapper"]}>
            <img src={Logo} alt="Logo" />
          </div>
          <div className={classes["auth-form-wrapper"]}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset disabled={isLoadingAuth}>
                <Input
                  register={register}
                  registerLabel="userName"
                  errors={errors["userName"]}
                  label="User Name"
                  loading={false}
                  focussed
                />
                <Input
                  type={"password"}
                  register={register}
                  registerLabel="password"
                  errors={errors["password"]}
                  label="Password"
                  loading={false}
                />
                <SubmitButton auth disabled={isLoadingAuth} />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
