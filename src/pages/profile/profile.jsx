import React, { useState, useEffect } from "react";
import "./profile.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import BottomBar from "../../component/bottombar/bottombar";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const id = data.id_user;
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/list/${id}`)
      .then((res) => {
        setProfile(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAccount = () => {
    const data = JSON.parse(localStorage.getItem("data"));
    const id = data.id_user;
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/user/delete/${id}`)
      .then((res) => {
        console.log(res);
        alert("Hapus Berhasil");
        localStorage.clear();
        return navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <div className="container-fluid profile-container">
        <div className="row">
          {profile.map((data, index) => (
            <div key={index} className="col-md-3 leftside-profile">
              <div className="row">
                <div className="col">
                  <Link to={`/chat`}>
                    <i
                      style={{ color: "#7E98DF" }}
                      className="fa fa-chevron-left"
                    ></i>
                  </Link>
                </div>
                <div className="text-center">
                  <h5 style={{ color: "#7E98DF" }}>{data.username}</h5>
                </div>
              </div>
              <div className="text-center mt-3">
                <div>
                  <img
                    className="img-profile"
                    src={`${data.image}`}
                    alt=""
                  />
                </div>
                <div className="mt-3">
                  <h5>{data.full_name}</h5>
                  <span className="text-secondary">{data.username}</span>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <h5>Account</h5>
                </div>
                <div>
                {
          data.phone == "" ? ("Data Not Found") : (
              <>
              <span>{data.phone}</span>
              </>
         )}
                </div>
                <div>
                  <Link to={`/edit-profile`} style={{ textDecoration: "none" }}>
                    <span>Tap to change profile</span>
                  </Link>
                </div>
                <hr />
              </div>
              <div className="mt-4">
                <div>
                  <h6>{data.username}</h6>
                </div>
                <div>
                  <span className="text-secondary">Username</span>
                </div>
                <hr />
              </div>
              <div className="mt-4">
                <div>
                  {data.description == null ? (
                    <h6>{data.description}</h6>
                  ) : (
                    <h6>{data.description}</h6>
                  )}
                </div>
                <div>
                  <span className="text-secondary">Bio</span>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <h5>Setting</h5>
                </div>
                <div className="row mt-3">
                  <div className="col-auto">
                    <img
                      className="profile-icon"
                      src={require("../../assets/images/Union.png")}
                      alt=""
                    />
                  </div>
                  <div className="col-auto">
                    <span>Notification and Sounds</span>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-auto">
                    <img
                      className="profile-icon"
                      src={require("../../assets/images/Group 5.png")}
                      alt=""
                    />
                  </div>
                  <div className="col-auto">
                    <span>Privaty and Security</span>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-auto">
                    <img
                      className="profile-icon"
                      src={require("../../assets/images/Group 6.png")}
                      alt=""
                    />
                  </div>
                  <div className="col-auto">
                    <span>Data and Storage</span>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-auto">
                    <img
                      className="profile-icon"
                      src={require("../../assets/images/Chat.png")}
                      alt=""
                    />
                  </div>
                  <div className="col-auto">
                    <span>Chat settings</span>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-auto">
                    <img
                      className="profile-icon"
                      src={require("../../assets/images/Device.png")}
                      alt=""
                    />
                  </div>
                  <div className="col-auto">
                    <span>Devices</span>
                  </div>
                </div>
                <div className="text-danger row mt-5">
                  <div className="col-auto">
                    <button
                      className="border-0 text-danger fw-bold bg-transparent"
                      onClick={() => deleteAccount()}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="col-md-9 rightside-profile">
            <div className="main-chat">
              <div
                className="main-chat2 text-center"
                style={{ paddingTop: "300px" }}
              >
                <span className="secondary-text">Dayum Chat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
