import {thunk} from "redux-thunk";
import createDebounce from "redux-debounced";
import logger from "redux-logger";
import rootReducer from "./reducers/index";
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";

const middleware = [createDebounce(), thunk];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };

// import thunk from "redux-thunk";
// import createDebounce from "redux-debounced";
// import logger from "redux-logger";
// import rootReducer from "./reducers/index";
// import { createStore, applyMiddleware, compose } from "redux";
// import { persistStore } from "redux-persist";

// const middleware = [createDebounce(), thunk];
// if (process.env.NODE_ENV === "development") {
//   middleware.push(logger);
// }
// const composeEnhancers =
//   (window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__()) ||
//   compose;
// // const store = createStore(
// //   rootReducer,
// //   {},
// //   composeEnhancers(applyMiddleware(...middleware))
// // );
// const store = createStore(
//   rootReducer /* preloadedState, */,
//   {},
//   composeEnhancers(applyMiddleware(...middleware))
// );

// const persistor = persistStore(store);

// export { store, persistor };
