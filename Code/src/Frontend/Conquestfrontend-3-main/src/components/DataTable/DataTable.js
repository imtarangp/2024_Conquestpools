import React from "react";
import classes from "./style.module.css";
import {
  AiOutlineCheck,
  AiOutlineCloseCircle,
  AiOutlineEye,
} from "react-icons/ai";
import moment from "moment";
const DataTable = ({
  columns,
  data,
  showDeclineModal,
  showModal,
  fetchManufac,
  fetchOrderImgs,
  filter,
}) => {
  const returnValue = (value) => {
    let val;
    if (typeof value === "boolean") {
      if (!!value) val = "Yes";
      else val = "No";
    } else {
      if (value?.length >= 17) {
        val = value?.substr(0, 12) + "...";
      } else val = value;
    }
    return val;
  };
  const handleViewOrder = (item) => {
    fetchManufac(item.id);
    fetchOrderImgs(item.id);
    showModal(item);
  };

  return (
    <>
      <div className={[classes["table-wrapper"], "my-5"].join(" ")}>
        <div className="d-flex">
          <p
            title={"Preview"}
            className={[classes["table-heading"], "text-center"].join(" ")}
          >
            View
          </p>
          {columns.map((title, j) => (
            <p key={j} title={title} className={classes["table-heading"]}>
              {title?.length >= 17 ? title?.substr(0, 12) + "..." : title}
            </p>
          ))}
          {filter.label === "Declined" || filter.label === "All" ? (
            <p className={classes["table-heading"]}>Declined Info</p>
          ) : null}
        </div>
        {!data?.length ? (
          <div>No Data !</div>
        ) : (
          data?.map((item, i) => {
            return (
              <div key={i} className={"d-flex"}>
                <p
                  className={[classes["table-data"], "text-center"].join(" ")}
                  onClick={() => handleViewOrder(item)}
                >
                  <AiOutlineEye
                    size={15}
                    color="fff"
                    style={{
                      background: "#08467f",
                      width: 40,
                      height: 25,
                      borderRadius: 5,
                    }}
                  />
                </p>
                <p className={classes["table-data"]} title={item?.serialNumber}>
                  {returnValue(item?.serialNumber)}
                </p>
                <p className={classes["table-data"]} title={item?.customer}>
                  {returnValue(item?.customer)}
                </p>
                <p className={classes["table-data"]} title={item?.city}>
                  {returnValue(item?.city)}
                </p>
                <p
                  className={classes["table-data"]}
                  title={item?.poolShape || ""}
                >
                  {returnValue(item?.poolShape || "")}
                </p>
                <p
                  className={classes["table-data"]}
                  title={item?.poolColour || ""}
                >
                  {returnValue(item?.poolColour || "")}
                </p>
                <p
                  className={classes["table-data"]}
                  title={item?.slotDate || ""}
                >
                  {returnValue(
                    moment(item?.slotDate).format("DD/MM/YYYY") || ""
                  )}
                </p>
                <p
                  className={classes["table-data"]}
                  title={item?.orderCreatedDate || ""}
                >
                  {item.orderCreatedDate &&
                    returnValue(
                      moment(item?.orderCreatedDate).format("DD/MM/YYYY") || ""
                    )}
                </p>
                <p className={classes["table-data"]} title={item?.departureTime}>
                  {item?.departureTime}
                </p>
                <p className={classes["table-data"]}>
                  {item?.approved ? (
                    <AiOutlineCheck size={22} color="green" />
                  ) : (
                    <AiOutlineCloseCircle size={22} color="red" />
                  )}
                </p>
                <p
                  className={classes["table-data"]}
                  title={item?.orderStatus || "N/A"}
                >
                  {item?.orderStatus === "Re-Submit Order"
                    ? "Re-Submitted"
                    : returnValue(
                        !!item?.orderStatus
                          ? item?.orderStatus
                          : item.approved
                          ? "Approved"
                          : "Pending"
                      )}
                </p>
                {filter.label === "Declined" || filter.label === "All" ? (
                  <p
                    className={classes["table-data"]}
                    title={item?.declinedOrderInfo || "N/A"}
                  >
                    {returnValue(item?.declinedOrderInfo || "N/A")}
                  </p>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default DataTable;
