import React from "react";
import { Link } from "react-router-dom";
import "./forgot-password.css";

const ForgotPassword = () => {
  return (
    <section>
      <div className="forgot-pw-container">
        <div className="container">
          <div className="forgot-pw-main-container">
            <div className="row">
              <div>
                <Link to={`/register`}>
                  <i
                    style={{ color: "#7E98DF" }}
                    className="fa fa-chevron-left"
                  ></i>
                </Link>
              </div>
              <div className="text-center">
                <h4 style={{ color: "#7E98DF" }}>Forgot Password</h4>
              </div>
            </div>
            <div className="mt-2">
              <span>You 'll get messages soon on your e-mail</span>
            </div>
            <div>
              <form>
                <div className="mb-3 mt-4 form-group">
                  <label className="form-label text-secondary">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="telegram@gmail.com"
                  />
                </div>
              </form>
              <div className="mt-4">
                <button className="btn forgot-pw-custom-btn">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
