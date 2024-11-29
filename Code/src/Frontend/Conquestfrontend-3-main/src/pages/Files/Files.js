import React, { useEffect, useState } from "react";
import LeftNavbar from "../../components/LeftNavBar/LeftNavbar";
import Header from "../../components/Header/Header";
// import classes from "./style.module.css";
const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
  }, []);

  const removeLoading = () => setIsLoading(false);

  return (
    <>
      <Header />
      <div>
        <div className="container-fluid px-5">
          <div className="row">
            <LeftNavbar />
            <div className="col-12 col-md-10 d-flex flex-column">
              <div className="d-flex">
                <h3>Conquest Pools Resources/Documents</h3>
              </div>
              {isLoading && "Please Wait"}
              <div style={{ minHeight: "500px" }}>
                <iframe
                  title="pdfViewer"
                  src="https://drive.google.com/embeddedfolderview?id=1zFugL6TkzxF7XI93eWy-nWvFqC19MZ2w#list"
                  width="600"
                  height="500"
                  frameBorder="0"
                  onLoad={removeLoading}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
