import React from "react";
import "./call-history.css";
import { Link } from "react-router-dom";

const CallHistory = () => {
  return (
    <section>
      <div className="call-container">
        <div className="row">
          <div className="col-md-3 sideleft-call">
            <div className="row">
              <div className="col">
                <Link to={`/chat`}>
                  <i
                    style={{ color: "#7E98DF" }}
                    className="fa fa-chevron-left"
                  ></i>
                </Link>
              </div>
              <div className="col" style={{ textAlign: "right" }}>
                <h5 style={{ color: "#7E98DF" }}>Call History</h5>
              </div>
            </div>
            <div className="mt-4">
              <div className="row">
                <div className="col-auto">
                  <img
                    className="user-img-chat"
                    src={require("../../assets/images/Rectangle 3.png")}
                    alt=""
                  />
                </div>
                <div className="col-auto mt-2">
                  <div>
                    <h6>Brother</h6>
                  </div>
                  <div>
                    <span className="text-secondary">18.02.2020 at 19:30</span>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-auto">
                  <img
                    className="user-img-chat"
                    src={require("../../assets/images/Rectangle 8.png")}
                    alt=""
                  />
                </div>
                <div className="col-auto mt-2">
                  <div>
                    <h6>Calvin Flores</h6>
                  </div>
                  <div>
                    <span style={{ color: "red" }}>18.02.2020 at 19:30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9 sideright-call"></div>
        </div>
      </div>
    </section>
  );
};

export default CallHistory;
