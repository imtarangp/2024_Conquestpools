// import React from "react";
// import { Switch, Redirect } from "react-router-dom";

// import Route from "./route";

// // import { HomeContainer, LoginContainer, PageNotFound } from "@containers";
// import Auth from "../pages/Auth/Auth";
// import Form from "../pages/Form/Form";
// import Table from "../pages/Table";
// import PageNotFound from "../pages/PageNotFound";

// const Router = (props) => {
//   return (
//     <Switch>
//       <Route exact path="/form" component={Form} />
//       <Route exact withoutHeaderAndFooter path="/" component={Auth} />
//       <Route exact path="/table" component={Table} />
//       <Route exact path="/404" component={PageNotFound} />
//       {/* <Route exact path="/" component={() => <Redirect to="/auth" />} /> */}
//       <Route exact path="/*" component={() => <Redirect to="/404" />} />
//     </Switch>
//   );
// };

// export default Router;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import Form from "../pages/Form/Form";
import Table from "../pages/Table";
import PageNotFound from "../pages/PageNotFound";
import Orders from "../pages/Orders/Orders";
import Files from "../pages/Files/Files";
import { useSelector } from "react-redux";
const Router = (props) => {
  const { isLoggedIn } = useSelector((state) => state?.auth);
  const base = document.getElementsByTagName("base")[0].getAttribute("href");
  let routes;

  if (!!isLoggedIn) {
    routes = (
      <BrowserRouter basename={base}>
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/form" element={<Form />} />
          <Route path="/table" element={<Table />} />
          <Route path="/files" element={<Files />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/404" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    routes = (
      <BrowserRouter basename={base}>
        <Routes>
          <Route path="/" element={<Auth noHeader />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/404" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return routes;
};
export default Router;
