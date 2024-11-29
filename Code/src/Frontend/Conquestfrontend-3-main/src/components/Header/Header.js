import React from "react";
import classes from "./style.module.css";
import { AiOutlineLogout } from "react-icons/ai";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogoutAsync } from "../../store/actions/auth";

const Header = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  // const history = useHistory();
  // let navigate = useNavigate();
  const handleLogout = () => {
    // history?.push("/");
    // window.location.reload();
    // navigate("/login");
    dispatch(authLogoutAsync());
  };

  return (
    <div className={classes["header-wrapper"]}>
      <div className="container-fluid px-5">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <div>
            <p className={[classes["header-left-title"], "mb-0"].join(" ")}>
              Welcome to the Conquest Pools Web Portal
            </p>
          </div>
          <div className="d-flex align-items-center">
            <div>
              <div>
                <p
                  className={[
                    classes["info-title"],
                    "text-center",
                    "mb-0",
                  ].join(" ")}
                >
                  <strong>Username: </strong>
                  <strong className={classes["user-name-title"]}>
                    {userData.userName}
                  </strong>
                </p>
              </div>
              {/* <div>
                <p
                  className={[
                    classes["info-title"],
                    "text-center",
                    "mb-0",
                  ].join(" ")}
                >
                  <strong>Headoffice: </strong>
                  <strong className={classes["user-name-title"]}>
                    Shepparton
                  </strong>
                </p>
              </div> */}
            </div>
            <div
              onClick={handleLogout}
              className={classes["logout-button-wrapper"]}
            >
              <AiOutlineLogout size={30} color="#08467f" />
              <label className={classes["logout-label"]}>Logoout</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
