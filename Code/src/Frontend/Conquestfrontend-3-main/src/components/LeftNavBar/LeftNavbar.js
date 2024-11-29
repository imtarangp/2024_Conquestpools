import React from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./style.module.css";
import { useDispatch } from "react-redux";
import { clearFormStep1 } from "../../store/actions/step1";
import { clearFormStep2 } from "../../store/actions/step2";
import { clearFormStep3 } from "../../store/actions/step3";
import { clearFormStep4 } from "../../store/actions/step4";
import { clearFormFinalStep } from "../../store/actions/finalStep";

const LeftNavbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const routes = [
    {
      id: 1,
      route: "/",
      title: "Current Orders",
    },
    {
      id: 2,
      route: "/form",
      title: "Create New Order",
      newOrder: true,
    },
    {
      id: 3,
      route: "/files",
      title: "Resources",
    },
  ];
  const handleCreateNewForm = () => {
    dispatch(clearFormStep1());
    dispatch(clearFormStep2());
    dispatch(clearFormStep3());
    dispatch(clearFormStep4());
    dispatch(clearFormFinalStep());
  };
  return (
    <div
      className={["col-2", classes["left-navbar-wrapper"], "py-2"].join(" ")}
    >
      {/* <div className={classes["navbar-section-heading-title-wrapper"]}>
        <p className={classes["navbar-section-heading-title"]}>Dashboard</p>
      </div> */}
      {routes?.map(({ id, route, title, newOrder }) => (
        <Link
          onClick={newOrder && handleCreateNewForm}
          key={id}
          to={route}
          style={{ textDecoration: "none" }}
        >
          <p
            className={[
              location?.pathname === route && classes["nav-bar-item-active"],
              location?.pathname === route
                ? classes["navbar-nav-item-active"]
                : classes["navbar-nav-item"],
            ].join(" ")}
          >
            {title}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default LeftNavbar;
