import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import "./login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login`, form)
      .then((response) => {
        console.log(response.data);
        if (response.data.status !== "success") {
          localStorage.setItem("token", response.data.token.token);
          localStorage.setItem(
            "data",
            JSON.stringify(response.data.token.data)
          );
          localStorage.setItem(
            "name",
            JSON.stringify(response.data.token.data.name)
          );
          alert("Login Success");
          return navigate("/chat");
        }
      })
      .catch((err) => {
        alert("Username or Password is Wrong");
        console.log(err);
      });
  };

  return (
    <section>
      <div className="login-container">
        <div className="container">
          <div className="main-login-container">
            <div className="text-center">
              <h4 style={{ color: "#7E98DF" }}>Login</h4>
            </div>
            <div className="mt-2">
              <span>Hi, welcome back</span>
            </div>
            <div>
              <form>
                <div className="mb-3 mt-4 form-group">
                  <label className="form-label text-secondary">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="telegram@gmail.com"
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3 mt-4 form-group">
                  <label className="form-label text-secondary">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="*******"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>
              </form>
              <div
                className="mt-2"
                style={{ textAlign: "right", color: "#7E98DF" }}
              >
                <Link
                  to={`/ForgotPassword`}
                  style={{ textDecoration: "none", color: "#7E98DF" }}
                >
                  <span>Forgot Password?</span>
                </Link>
              </div>
              <div className="mt-3">
                <button onClick={onSubmit} className="btn login-btn">
                  Login
                </button>
              </div>
              <div className="mt-4 mb-4 text-center">
                <span className="text-secondary">Login with</span>
              </div>
              <div className="mt-3">
                <button className="btn google-btn">
                  <i class="fa fa-google"> Google</i>
                </button>
              </div>
              <div className="mt-4 text-center">
                <span>Don't have account?</span>{" "}
                <Link to={`/register`} style={{ textDecoration: "none" }}>
                  <span style={{ color: "#7E98DF" }}>Sign Up</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
