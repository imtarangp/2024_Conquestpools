// ** Redux Imports
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// ** Reducers Imports
import auth from "./auth";
import step1 from "./step1";
import step2 from "./step2";
import step3 from "./step3";
import step4 from "./step4";
import finalStep from "./finalStep";
import dropdowns from "./dropdowns";
import orders from "./orders";
import reSubmit from "./resubmitOrder";
// import category from "./category";
// import menu from "./menu";
// import sauce from "./sauce";
// import addons from "./addons";
// import toppings from "./toppings";
// import discount from "./discounts";
// import orders from "./orders";
// import workingTimings from "./workingTimings";
// import support from "./support";
// import users from "./users";
// import brands from "./brands";
// import houseCall from "./houseCalls";
import diagram from "./diagram";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  diagram,
  auth,
  step1,
  step2,
  step3,
  step4,
  finalStep,
  dropdowns,
  orders,
  reSubmit,
  //   category,
  //   menu,
  //   sauce,
  //   addons,
  //   discount,
  //   orders,
  //   workingTimings,
  //   toppings,
  //   inventory,
  //   users,
  //   support,
  //   brands,
  //   houseCall,
});

export default persistReducer(persistConfig, rootReducer);
