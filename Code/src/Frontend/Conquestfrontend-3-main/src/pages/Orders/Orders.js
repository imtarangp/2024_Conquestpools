import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ReactToPrint from "react-to-print";
import { CanvasPreview } from "../../components/CanvasPreview/CanvasPreview";
import DataTable from "../../components/DataTable/DataTable";
import Header from "../../components/Header/Header";
import LeftNavbar from "../../components/LeftNavBar/LeftNavbar";
import SubmitButton from "../../components/uielements/SubmitButton/SubmitButton";
import data from "../../data/orderTable.json";
import { declineSchema } from "../../schemas/decline-order-schema";
import {
  getBlanketRollerStartAsync,
  getHandeoverKitStartAsync,
  getHeatingStartAsync,
  getManufacturingOptionsStartAsync,
  getPipeStartAsync,
  getPoolColourStartAsync,
  getPoolLightsStartAsync,
  getPoolSaltStartAsync,
  getPoolShapeStartAsync,
  getSkimmerStartAsync,
  getSpaJetsStartAsync,
  getTransformerStartAsync,
} from "../../store/actions/dropdowns";
import {
  getOrderImagesAsync,
  reSubmitSignatureStartAsync,
} from "../../store/actions/finalStep";
import {
  declineOrderStartAsync,
  getDeclinedOrdersStartAsync,
  getOrderManufacsStartAsync,
  getOrdersStartAsync,
  getPendingOrdersStartAsync,
} from "../../store/actions/orders";
import { loadReSubOrderStartAsync } from "../../store/actions/reSubmitOrder";
import { submitStep1ValuesStartAsync } from "../../store/actions/step1";
import { submitStep2ValuesStartAsync } from "../../store/actions/step2";
import { submitStep3ValuesStartAsync } from "../../store/actions/step3";
import { submitStep4ValuesStartAsync } from "../../store/actions/step4";
import {
  step1ResubVals,
  step2ResubVals,
  step3ResubVals,
  step4ResubVals,
  stepSignResubVals,
} from "../../utils/helper";
import classes from "./style.module.css";
// import {
//   getDefaultManufacOptsStartAsync,
//   submitStep3ValuesStartAsync,
// } from "../../store/actions/step3";

const conditionalRender = ({ label, value }) => {
  if (!!value) {
    return (
      <div className="col-4">
        <div className="d-flex">
          <p className={classes["table-val"]}>
            {label} : {value}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSkimmerStartAsync());
    dispatch(getPoolLightsStartAsync());
    dispatch(getTransformerStartAsync());
    dispatch(getSpaJetsStartAsync());
    dispatch(getPipeStartAsync());
    dispatch(getHeatingStartAsync());
    dispatch(getBlanketRollerStartAsync());
    dispatch(getHandeoverKitStartAsync());
    dispatch(getPoolSaltStartAsync());
    dispatch(getManufacturingOptionsStartAsync());
    dispatch(getPoolColourStartAsync());
    dispatch(getPoolShapeStartAsync());
  }, []);

  const { isLoading, orders, isLoadingManufac, orderManufac } = useSelector(
    (state) => state?.orders
  );
  const { isLoadingDropdown, manufacturingOptionsArray } = useSelector(
    (state) => state?.dropdowns
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDecModal, setIsOpenDecModal] = useState(false);
  const [activeRow, setActiveRow] = useState({});
  const [declineReason, setDeclineReason] = useState("");
  const { diagram } = useSelector((state) => state?.finalStep);
  const componentRef = useRef();
  const navigate = useNavigate();

  const [displayRows, setDisplayRows] = useState({
    value: 20,
    label: 20,
  });
  const [filter, setFilter] = useState({ value: "all", label: "All" });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getOrdersStartAsync());
    }, 1);
  }, []);

  const handleChangeDisplayRows = (value) => {
    setCurrentPage(1);
    setDisplayRows(value);
  };
  const handleFilter = (obj) => {
    setFilter(obj);
    if (obj.label === "All") {
      dispatch(getOrdersStartAsync());
    }
    //  else if (obj.label === "Approved") {
    //   dispatch(getApprovedOrdersStartAsync());
    // }
    else if (obj.label === "Declined") {
      dispatch(getDeclinedOrdersStartAsync());
    } else {
      dispatch(getPendingOrdersStartAsync());
    }
  };
  // const possiblePages = Math.ceil(data?.count / displayRows?.value);
  const possiblePages = Math.ceil(orders?.length / displayRows?.value);
  const poolOrders =
    displayRows?.value > orders.length
      ? orders
      : orders?.slice(
        (currentPage - 1) * displayRows?.value,
        displayRows?.value * currentPage
      );

  const showModal = (row) => {
    setIsOpenModal(true);
    setActiveRow(row);
  };

  const showDeclineModal = (row) => {
    setIsOpenDecModal(true);
    setActiveRow(row);
  };

  const hideModal = () => {
    setIsOpenModal(false);
    setIsOpenDecModal(false);
    setActiveRow({});
  };

  const onSubmit = (data, e) => {
    dispatch(declineOrderStartAsync(activeRow.id, data.reason, hideModal));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(declineSchema),
  });


  const handleResubmit = () => {
    // dispatch(getDefaultManufacOptsStartAsync(activeRow.id));
    const activeRowWithoutSignature = {
      ...activeRow,
      signature: "",
      signatureURL: ""
    };
    dispatch(loadReSubOrderStartAsync(activeRowWithoutSignature));
    dispatch(submitStep1ValuesStartAsync(step1ResubVals(activeRowWithoutSignature)));
    dispatch(submitStep2ValuesStartAsync(step2ResubVals(activeRowWithoutSignature)));
    dispatch(
      submitStep3ValuesStartAsync(
        step3ResubVals(activeRowWithoutSignature, orderManufac, manufacturingOptionsArray)
      )
    );
    dispatch(submitStep4ValuesStartAsync(step4ResubVals(activeRowWithoutSignature)));
    dispatch(
      reSubmitSignatureStartAsync(stepSignResubVals(activeRowWithoutSignature).signature)
    );

    // navigate("/form?type=resubmit&orderId=1");
    navigate("/form", {
      state: {
        orderId: activeRowWithoutSignature.id,
        type: "resub",
      },
    });
  };
  const fetchManufac = (orderId) => {
    dispatch(getOrderManufacsStartAsync(orderId));
  };

  const fetchOrderImgs = (orderId) => {
    dispatch(getOrderImagesAsync(orderId));
  };
  // useEffect(() => {
  //   //     20613
  //   // 20612
  //   // 20611
  //   // 20610
  //   dispatch(getOrderManufacsStartAsync(20612));
  // }, []);

  return (
    <>
      <Header />
      <div>
        <div className="container-fluid px-5">
          <div className="row">
            <LeftNavbar />
            <div className="col-12 col-md-9 d-flex flex-column">
              <h1>Orders</h1>
              <div className="d-flex justify-content-between align-items-center">
                {/* {!!poolOrders?.length && ( */}
                <div
                  className="d-flex"
                  style={{ maxWidth: 750, overflowX: "auto" }}
                ></div>
                <div className="d-flex align-items-end">
                  <Select
                    options={[
                      {
                        value: 5,
                        label: 5,
                      },
                      {
                        value: 7,
                        label: 7,
                      },
                      {
                        value: 10,
                        label: 10,
                      },
                      {
                        value: 15,
                        label: 15,
                      },
                      {
                        value: 20,
                        label: 20,
                      },
                    ]}
                    defaultValue={
                      !!Object.keys(displayRows).length
                        ? displayRows
                        : { value: 5, label: 5 }
                    }
                    onChange={(e) => handleChangeDisplayRows(e)}
                  />
                  <div style={{ marginLeft: 15, minWidth: 150 }}>
                    <p
                      className="mb-0"
                    // style={{ position: "absolute", top: 0 }}
                    >
                      Filters
                    </p>
                    <Select
                      options={[
                        {
                          value: "all",
                          label: "All",
                        },
                        {
                          value: "pending",
                          label: "Pending",
                        },
                        // {
                        //   value: "approved",
                        //   label: "Approved",
                        // },
                        {
                          value: "declined",
                          label: "Declined",
                        },
                      ]}
                      isDisabled={isLoading}
                      defaultValue={filter}
                      onChange={(e) => handleFilter(e)}
                    />
                  </div>
                </div>
              </div>

              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <DataTable
                  filter={filter}
                  columns={data?.columns}
                  data={poolOrders}
                  noOfRows={displayRows}
                  loading={isLoading}
                  currentPage={currentPage}
                  showModal={showModal}
                  showDeclineModal={showDeclineModal}
                  fetchManufac={fetchManufac}
                  fetchOrderImgs={fetchOrderImgs}
                />
              )}
              {!isLoading && (
                <div className="d-flex align-items-center">
                  <button
                    className={classes["page-button"]}
                    onClick={() => setCurrentPage(1)}
                  >
                    First
                  </button>
                  <button
                    className={classes["page-button"]}
                    onClick={() =>
                      setCurrentPage((ps) => (ps === 1 ? 1 : ps - 1))
                    }
                  >
                    Prev
                  </button>
                  <p className={["mb-0", classes["page-number"]].join(" ")}>
                    {currentPage}-{possiblePages}
                  </p>
                  <button
                    className={classes["page-button"]}
                    onClick={() =>
                      setCurrentPage((ps) =>
                        ps === possiblePages ? possiblePages : ps + 1
                      )
                    }
                  >
                    Next
                  </button>
                  <button
                    className={classes["page-button"]}
                    onClick={() => setCurrentPage(possiblePages)}
                  >
                    Last
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        {isOpenModal && (
          <div className={classes["modal-layout"]}>
            <div
              className={[classes["modal-wrapper"], "col-12", "col-md-8"].join(
                " "
              )}
            >
              <div className="d-flex p-4 justify-content-between">
                <h1>Preview</h1>
                <div onClick={hideModal} style={{ cursor: "pointer" }}>
                  <AiOutlineCloseCircle size={22} color="red" />
                </div>
              </div>
              <div
                // className="d-flex justify-content-center align-items-center"
                className="p-4"
                // style={{
                //   border: "solid 2px #6200ff",
                //   flex: 1,
                //   maxHeight: 450,
                //   overflow: "auto",
                // }}
                ref={componentRef}
              >
                {activeRow.orderStatus === "Declined" && (
                  <div
                    className="d-flex justify-content-center p-3 mb-3"
                    style={{ border: "solid 1px #ccc", background: "#eee" }}
                  >
                    <p className="mb-0">
                      <strong>Order Status :</strong> Declined
                    </p>
                    <p className="mx-3 mb-0">
                      <strong>Decline Info :</strong>{" "}
                      {activeRow?.declinedOrderInfo}
                    </p>
                  </div>
                )}
                <p>
                  <strong>1. Customer & Pool Details</strong>
                </p>
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Customer : {activeRow?.customer}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Email : {activeRow?.customerEmail}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Contact Number : {activeRow?.customerMobileNumber}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Postal Addres : {activeRow?.customerPostalAddress}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Delivery Address: {activeRow?.customerDeliveryAddress}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Suburb / City: {activeRow?.city}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        State: {activeRow?.state}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Post Code: {activeRow?.postcode}
                      </p>
                    </div>
                  </div>
                  {/* <div className="col-4">
                  <div className="d-flex">
                    <p className={classes["table-val"]}>Dealer : {activeRow?.dealer}</p>
                  </div>
                </div> */}
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Slot Date :{" "}
                        {activeRow?.slotDate &&
                          moment(activeRow?.slotDate).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Order Created Date :{" "}
                        {activeRow?.orderCreatedDate &&
                          moment(activeRow?.orderCreatedDate).format(
                            "DD/MM/YYYY"
                          )}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pool Delivered Early To Site :
                        {activeRow?.poolDeliveredEarlytoSite}
                      </p>
                    </div>
                  </div>
                  {activeRow?.poolDeliveredEarlytoSite === "Yes" && (
                    <div className="col-4">
                      <div className="d-flex">
                        <p>
                          Pool Delivered Early To Site Date:
                          {activeRow?.poolDeliveredEarlytoSiteDate}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pool Delivered In Afternoon :
                        {activeRow?.poolDeliveredInAfternoon}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Required To Lift Pool Into Hole On Site? :
                        {activeRow?.conquestRequiredtoLiftPoolIntoHoleOnSite}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Is Pool Meeting Crane :
                        {activeRow?.poolDeliveredEarlytoSite}
                      </p>
                    </div>
                  </div>
                  {activeRow?.isPoolMeetingCrane === "Yes" && (
                    <div className="col-4">
                      <div className="d-flex">
                        <p>
                          Pool Delivered Early To Site Time:
                          {`${activeRow?.isPoolMeetingCraneTime}`}
                        </p>
                      </div>
                    </div>
                  )}
                  {/* <div className="col-4">
                  <div className="d-flex">
                    <p className={classes["table-val"]}>
                      Pool Size : {activeRow?.poolSize}
                    </p>
                  </div>
                </div> */}
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pool Shape : {activeRow?.poolShape}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pool Colour : {activeRow?.poolColour}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Kitpool :
                        {activeRow?.kitPool ? (
                          <AiOutlineCheck size={22} color="green" />
                        ) : (
                          <AiOutlineCloseCircle size={22} color="red" />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <p>
                  <strong>2. Pool Accessories</strong>
                </p>
                <div className="row">
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Skimmer : {activeRow?.skimmer}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pool Lights : {activeRow?.poolLights}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pool Lights Qty : {activeRow?.poolLightsQty}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Transformer : {activeRow?.transformer}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        SPA Jet : {activeRow?.spaJets}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        SPA Jet Qty : {activeRow?.spaJetsQty}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pipeing 1 : {activeRow?.pipeing}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pipeing 1 Qty : {activeRow?.pipeQty}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pipeing 2 : {activeRow?.pipeing2}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pipeing 2 Qty : {activeRow?.pipeing2Qty}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Heating : {activeRow?.spaJets?.heating}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Blanket / Roller : {activeRow?.blanketRoller}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Handover Kit : {activeRow?.handoverKit}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pool Salt : {activeRow?.poolSalt}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pool Salt Qty : {activeRow?.poolSaltQty}
                      </p>
                    </div>
                  </div>

                  {conditionalRender({ label: "Spa jet housing Qty", value: activeRow?.spaJetHousingQty })}
                  {conditionalRender({ label: "Spa jet internal Qty", value: activeRow?.spaJetinternalQty })}
                  {conditionalRender({ label: "Spa wet kit Qty", value: activeRow?.spaWetKitQty })}
                  {conditionalRender({ label: "Spa venturi kit Qty", value: activeRow?.spaVenturiKitQty })}
                  {conditionalRender({ label: "Brochures Qty", value: activeRow?.brochuresQty })}
                  {conditionalRender({ label: "Eyeball white Qty", value: activeRow?.eyeballWhiteQty })}
                  {conditionalRender({ label: "Eyeball grey Qty", value: activeRow?.eyeballGreyQty })}
                  {conditionalRender({ label: "Down jet white Qty", value: activeRow?.downJetWhiteQty })}
                  {conditionalRender({ label: "Down jet grey Qty", value: activeRow?.downJetGreyQty })}
                  {conditionalRender({ label: "Suction white Qty", value: activeRow?.suctionWhiteQty })}
                  {conditionalRender({ label: "Suction grey Qty", value: activeRow?.suctionGreyQty })}
                  {conditionalRender({ label: "Suction clear Qty", value: activeRow?.suctionClearQty })}
                  {conditionalRender({ label: "Beam ties Qty", value: activeRow?.beamTiesQty })}
                  {conditionalRender({ label: "40mm 90deg elbow white Qty", value: activeRow?.fortymm90degElbowWhiteQty })}
                  {conditionalRender({ label: "40mm 45deg elbow white Qty", value: activeRow?.fortymm45degElbowWhiteQty })}
                  {conditionalRender({ label: "40mm tee white Qty", value: activeRow?.fortymmTeeWhiteQty })}
                  {conditionalRender({ label: "50mm 90deg elbow white Qty", value: activeRow?.fiftymm90degElbowWhiteQty })}
                  {conditionalRender({ label: "50mm 45deg elbow white Qty", value: activeRow?.fiftymm45degElbowWhiteQty })}
                  {conditionalRender({ label: "50mm tee white Qty", value: activeRow?.fiftymmTeeWhiteQty })}
                  {conditionalRender({ label: "Clear primer Qty", value: activeRow?.clearPrimerQty })}
                  {conditionalRender({ label: "Red primer Qty", value: activeRow?.redPrimerQty })}
                  {conditionalRender({ label: "Clear glue Qty", value: activeRow?.clearGlueQty })}
                  {conditionalRender({ label: "Green glue Qty", value: activeRow?.greenGlueQty })}
                  {conditionalRender({ label: "Max silicon white Qty", value: activeRow?.maxisilSiliconWhiteQty })}
                  {conditionalRender({ label: "Max silicon clear Qty", value: activeRow?.maxisilSiliconClearQty })}
                  {conditionalRender({ label: "Infloor gears Qty", value: activeRow?.infloorGearsQty })}
                  {conditionalRender({ label: "Infloor impellar Qty", value: activeRow?.infloorImpellarQty })}
                  {conditionalRender({ label: "Infloor valve lid Qty", value: activeRow?.infloorValveLidQty })}
                  {conditionalRender({ label: "Infloor valve or ring Qty", value: activeRow?.infloorValveORingQty })}
                  {conditionalRender({ label: "Infloor valve steel clamp Qty", value: activeRow?.infloorValveSteelClampQty })}
                  {conditionalRender({ label: "Infloor valve complete Qty", value: activeRow?.infloorValveCompleteQty })}
                  {conditionalRender({ label: "Infloor jet white Qty", value: activeRow?.infloorJetWhiteQty })}
                  {conditionalRender({ label: "Infloor jet grey Qty", value: activeRow?.infloorJetGreyQty })}
                  {conditionalRender({ label: "Infloor tool Qty", value: activeRow?.infloorToolQty })}
                  {conditionalRender({ label: "Ultraquest skimmer basket Qty", value: activeRow?.ultraquestSkimmerBasketQty })}
                  {conditionalRender({ label: "Ultraquest weir door Qty", value: activeRow?.ultraquestWeirDoorQty })}
                  {conditionalRender({ label: "Ultraquest vac plate Qty", value: activeRow?.ultraquestVacPlateQty })}
                  {conditionalRender({ label: "Ultraquest skimmer lid beige Qty", value: activeRow?.ultraquestSkimmerLidBeigeQty })}
                  {conditionalRender({ label: "Ultraquest skimmer lid grey Qty", value: activeRow?.ultraquestSkimmerLidGreyQty })}
                  {conditionalRender({ label: "Blanket strap Qty", value: activeRow?.blanketStrapQty })}

                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Additional Options : {activeRow?.accAditionalOptions}
                      </p>
                    </div>
                  </div>
                </div>
                <p>
                  <strong>3. Manufacturing</strong>
                </p>
                <div className="row">
                  <div className="col-8">
                    <div className="d-flex align-items-center">
                      <p className={[classes["table-val"], "mb-0"].join(" ")}>
                        Manufacturing Options
                      </p>
                      <div className="d-flex align-items-center mx-2">
                        {orderManufac.map(({ label }) => (
                          <p style={{ fontSize: 12 }} className="mb-0 mx-1">
                            <strong>{`${label}`}</strong>,
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Fittings Colour : {activeRow?.fittingsColour}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Manufacturing Notes : {activeRow?.manufacturingNotes}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Spa Height : {activeRow?.spaHeight}
                      </p>
                    </div>
                  </div>
                </div>
                <p>
                  <strong>4. Pre Plumb</strong>
                </p>
                <div className="row">
                  {/* <div className="col-4">
                  <div className="d-flex">
                    <p className={classes["table-val"]}>Driver : {activeRow?.driver}</p>
                  </div>
                </div> */}
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pre Plumb : {activeRow?.prePlumb}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pump System : {activeRow?.stdPrePlumb}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Pre Plumb With Solar Main Drain :
                        {activeRow?.manufacturingNotes}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Solar Suction Fittings :
                        {activeRow?.solarSuctionFittingsColour}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Trim Pool Only : {activeRow?.trimPoolOnly}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Cut Skimmer : {activeRow?.cutSkimmer}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Install Hydro : {activeRow?.installHydro}
                      </p>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex">
                      <p className={classes["table-val"]}>
                        Other Instructions : {activeRow?.otherInstructions}
                      </p>
                    </div>
                  </div>
                  {/* <div className="col-4">
                  <div className="d-flex">
                    <p className={classes["table-val"]}>Schedule Notes : {activeRow?.scheduleNotes}</p>
                  </div>
                </div> */}
                </div>
                <div className="px-2 py-3 d-flex justify-content-center">
                  {diagram && diagram.length ? (
                    <CanvasPreview diagram={diagram} />
                  ) : (
                    ""
                  )}
                </div>
                {activeRow.signature ? (
                  <div
                    className="d-flex justify-content-center"
                    style={{ border: "solid 1px #ccc" }}
                  >
                    <div className="col-4">
                      <img
                        style={{ maxWidth: "100%" }}
                        src={activeRow.signature}
                      />
                      <h3 className="text-center">Signature</h3>
                    </div>
                  </div>
                ) : (
                  <h3 className="text-center my-4">No Signature Available</h3>
                )}

                {/* <p>
                <strong>5. Diagram</strong>
                </p>
                <div className="row">
                <div
                className="col-6 py-2"
                style={{ border: "solid 1px #ccc" }}
                >
                <p className="text-center">
                <strong>Deep</strong>
                </p>
                <div className="d-flex flex-wrap">
                {finalStepVals?.list
                  .filter(({ description }) => description === "deep")
                  .map(({ value }) => (
                    <div
                    style={{ marginRight: 10, marginBottom: 10 }}
                    className={classes["tile"]}
                    >
                    {value}
                    </div>
                    ))}
                    </div>
                    </div>
                <div
                className="col-6 py-2"
                style={{ border: "solid 1px #ccc" }}
                >
                <p className="text-center">
                <strong>Shallow</strong>
                </p>
                <div className="d-flex flex-wrap">
                {finalStepVals?.list
                  .filter(({ description }) => description === "shallow")
                  .map(({ value }) => (
                        <div
                        style={{ marginRight: 10, marginBottom: 10 }}
                        className={classes["tile"]}
                        >
                        {value}
                        </div>
                        ))}
                        </div>
                        </div>
                        </div>
                        <p className="mt-3">
                        <strong>6. Signature</strong>
                        </p>
                        <div className="row">
                        <div className="col-12">
                        <img alt="sign" src={finalStepVals?.signatureURL} />
                        </div>
                      </div> */}
              </div>
              <div className="d-flex justify-content-center my-2">
                {filter.label === "Declined" && (
                  <a
                    className={
                      classes["resub-button"] + " w-auto text-decoration-none"
                    }
                    onClick={handleResubmit}
                  >
                    Re Submit
                  </a>
                )}
                {filter.label === "All" && (
                  <a
                    href="mailto:logistics@conquestpools.com.au"
                    className={
                      classes["resub-button"] + " w-auto text-decoration-none"
                    }
                  >
                    Request a Change
                  </a>
                )}
                <ReactToPrint
                  trigger={() => (
                    <a
                      className={
                        classes["resub-button"] + " w-auto text-decoration-none"
                      }
                    >
                      Print
                    </a>
                  )}
                  content={() => componentRef.current}
                />
              </div>
            </div>
          </div>
        )}
        {isOpenDecModal && (
          <div className={classes["modal-layout"]} ref={componentRef}>
            <div
              className={[classes["modal-wrapper"], "col-12", "col-md-8"].join(
                " "
              )}
            >
              <div className="d-flex p-4 justify-content-between">
                <h1>Decline Order</h1>
                <div onClick={hideModal} style={{ cursor: "pointer" }}>
                  <AiOutlineCloseCircle size={22} color="red" />
                </div>
              </div>
              <div className="p-4">
                <p>Decline Reason</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    className={
                      errors["reason"]?.message
                        ? classes["decline-reason-field-error"]
                        : classes["decline-reason-field"]
                    }
                    rows={5}
                    {...register(`reason`)}
                  ></textarea>
                  {errors["reason"]?.message && (
                    <p className={["mb-1", classes["error-text"]].join(" ")}>
                      {errors["reason"]?.message}
                    </p>
                  )}
                  <div>
                    <SubmitButton />
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
