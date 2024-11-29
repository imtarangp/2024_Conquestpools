export const finalForm = (step1, step2, step3, step4, finalStep, printName) => {
  const step1Final = {
    ...step1?.values,
    state: step1?.values?.state?.label,
    poolDeliveredEarlytoSite: step1?.values?.poolDeliveredEarlytoSite?.label,
    poolDeliveredInAfternoon: step1?.values?.poolDeliveredInAfternoon?.label
      ? step1?.values?.poolDeliveredInAfternoon?.label
      : null,
    conquestRequiredtoLiftPoolIntoHoleOnSite: step1?.values
      ?.conquestRequiredtoLiftPoolIntoHoleOnSite?.label
      ? step1?.values?.conquestRequiredtoLiftPoolIntoHoleOnSite?.label
      : null,
    isPoolMeetingCrane: step1?.values?.isPoolMeetingCrane?.label,
    poolColour: step1?.values?.poolColour?.label,
    poolShape: step1?.values?.poolShape?.label,
    poolDeliveredEarlytoSiteDate: null,
    city: step1?.values?.city,
    // isPoolMeetingCraneTime:
    //   step1?.values?.isPoolMeetingCraneDate &&
    //   step1?.values?.isPoolMeetingCraneTime
    //     ? `${step1?.values?.isPoolMeetingCraneDate} ${step1?.values?.isPoolMeetingCraneTime}`
    //     : "",
    isPoolMeetingCraneTime: step1?.values?.isPoolMeetingCraneTime,
  };
  const step2Final = {
    ...step2?.values,
    poolSalt: step2?.values?.poolSalt?.label,
    handoverKit: step2?.values?.handoverKit?.label,
    blanketRoller: step2?.values?.blanketRoller?.label,
    pipeing: step2?.values?.pipeing?.label,
    pipeing2: step2?.values?.pipeing2?.label,
    transformer: step2?.values?.transformer?.label,
    poolLights: step2?.values?.poolLights?.label,
    skimmer: step2?.values?.skimmer?.label,
  };
  const step3Final = {
    ...step3?.values,
    fittingsColour: step3?.values?.fittingsColour?.label,
    spaHeight: step3?.values?.spaHeight?.label,
  };
  // const manufacOptionsFinal = step3?.values["select-options"]?.length
  //   ? step3?.values["select-options"].map(({ label }) => ({
  //       label,
  //     }))
  //   : [];
  const manufacOptionsFinal = step3?.values["select-options"]?.length
    ? step3?.values["select-options"].map(({ label }) => label)
    : [];
  // const manufacOptionsFinal= Object.values(step3?.values["select-options"]).map((label))
  const step4Final = {
    ...step4?.values,
    prePlumb: step4?.values?.prePlumb?.label,
    // productionColor: step4?.values?.productionColor?.label,
    prePlumbSolarMainDrain: step4?.values?.prePlumbSolarMainDrain?.label,
    stdPrePlumb: step4?.values?.stdPrePlumb?.label,
    solarSuctionFittingsColour: step4?.values?.solarSuctionFittingsColour?.label
      ? step4?.values?.solarSuctionFittingsColour?.label
      : "White",
    trimPoolOnly: step4?.values?.trimPoolOnly?.label,
    cutSkimmer: step4?.values?.cutSkimmer?.label,
    installHydro: step4?.values?.installHydro?.label,
    cutHydro: step4?.values?.cutHydro?.label,
  };
  const finalStepFinal = {
    // list: [...finalStep.list],
    // signature: finalStep.signatureURL,
  };
  const finalDiagram = [...Object.values(finalStep.diagram)];
  delete step3Final["select-options"];
  return {
    form: {
      constructionStatus: false,
      scheduleOrder: 0,
      orderComplete: false,
      faultyMold: false,
      intheWings: false,
      approved: false,
      signatureName: printName,

      prePlumbSolarMainDrain: null,
      driver: null,
      serialNumber: null,
      kitPool: false,
      fullInFloorCleaning: false,
      departureTime: null,
      productionColor: null,
      scheduleNotes: null,
      orderStatus: null,
      declinedOrderInfo: null,
      employeeName: null,
      orderCreatedDate: null,

      ...step1Final,
      ...step2Final,
      ...step3Final,
      ...step4Final,
    },
    manufacOptions: [...manufacOptionsFinal],
    diagram: {
      ...finalStepFinal,
    },
    finalDiagram,
  };
};
