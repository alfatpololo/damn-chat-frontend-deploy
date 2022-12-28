import React, { useState } from "react";
import swal from "sweetalert";
import "./register.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      form.full_name == "" ||
      form.username == "" ||
      form.email == "" ||
      form.password == ""
    ) {
      alert("Semua input wajib diisi");
    } else {
      const body = {
        full_name: form.full_name,
        username: form.username,
        email: form.email,
        password: form.password,
      };
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/register`, body)
        .then((res) => {
          if (res.data.code !== 200) {
            alert("error:" + res.data.message);
          } else {
            alert("Register Success");
            return navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <section>
      <div className="register-container">
        <div className="container">
          <div className="register-main-container mt-3">
            <div className="row">
              <div>
                <Link to={`/`}>
                  <i
                    style={{ color: "#7E98DF" }}
                    className="fa fa-chevron-left"
                  ></i>
                </Link>
              </div>
              <div className="text-center">
                <h4 style={{ color: "#7E98DF" }}>Register</h4>
              </div>
            </div>
            <div className="mt-2">
              <span>Let's create your account</span>
            </div>
            <div>
              <form>
                <div className="mb-3 mt-4 form-group">
                  <label className="form-label text-secondary">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Telegram App"
                    onChange={(e) =>
                      setForm({ ...form, full_name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3 mt-4 form-group">
                  <label className="form-label text-secondary">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="@username"
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                  />
                </div>
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
                <button onClick={onSubmit} className="btn register-btn">
                  Register
                </button>
              </div>
              <div className="mt-4 mb-4 text-center">
                <span className="text-secondary">Register with</span>
              </div>
              <div className="mt-3">
                <button className="btn google-btn">
                  <i class="fa fa-google"> Google</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
