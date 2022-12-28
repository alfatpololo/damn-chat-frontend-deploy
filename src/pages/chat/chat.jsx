import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import "./chat.css";

const Chat = () => {
  const navigate = useNavigate();
  const [socketio, setSocketIo] = useState(null);
  const [listchat, setListchat] = useState([]);

  // listener
  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);
    socket.on("send-message-response", (response) => {
      // set receiver
      const receiver = JSON.parse(localStorage.getItem("receiver"));
      // Kondisi nampilkan data receiver
      if (
        receiver.username === response[0].sender ||
        receiver.username === response[0].receiver
      ) {
        setListchat(response);
      }
    });
    setSocketIo(socket);
  }, []);

  // sender
  const [message, setMessage] = useState();
  const onSubmitMessage = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("data"));
    const receiver = JSON.parse(localStorage.getItem("receiver"));

    // list history saat submit message
    const payload = {
      sender: user.username,
      receiver: receiver.username,
      message,
    };

    setListchat([...listchat, payload]);

    const data = {
      sender: user.id_user,
      receiver: activeReceiver.id_user,
      message,
    };

    socketio.emit("send-message", data);

    setMessage("");
  };

  const [listuser, setListUser] = useState([]);
  const [login, setLogin] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("data"));
    setLogin(user);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/list`)
      .then((response) => {
        setListUser(response.data.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [activeReceiver, setActiveReceiver] = useState({});
  const selectReceiver = (item) => {
    // Reset chat feature
    setListchat([]);

    setActiveReceiver(item);

    // set Receiver
    localStorage.setItem("receiver", JSON.stringify(item));
    socketio.emit("join-room", login);

    const data = {
      sender: login.id_user,
      receiver: item.id_user,
    };

    socketio.emit("chat-history", data);
  };

  const logout = () => {
    localStorage.clear();
    return navigate("/");
  };

  const deleteChat = (id_chat) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/chat/delete/${id_chat}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [query, setQuery] = useState("");
  const search = (data) => {
    return data.filter((item) =>
      item.full_name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const [querychat, setQueryChat] = useState("");
  const searchChat = (data) => {
    return data.filter((item) =>
      item.message.toLowerCase().includes(querychat.toLowerCase())
    );
  };

  return (
    <section>
      {/* {JSON.stringify(listuser)} */}
      <div className="container-fluid chat-container">
        <div className="row">
          <div className="col-md-3 leftside-chat">
            <div className="row">
              <div className="col">
                <h4 style={{ color: "#7E98DF" }}>Dayum Chat</h4>
              </div>
              <div className="col" style={{ textAlign: "right" }}>
                <button
                  classname="button-dropdown-custom"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  id="dropdownmenu"
                >
                  <i
                    style={{
                      color: "#7E98DF",
                      fontSize: "20px",
                      paddingTop: "8px",
                    }}
                    className="fa fa-bars"
                  ></i>
                </button>
                <div
                  className="dropdown-menu dropdownmenu-custom"
                  aria-labelledby="dropdownmenu"
                >
                  <div>
                    <div className="row">
                      <div className="col-auto">
                        <i class="fa fa-gear"></i>
                      </div>
                      <div className="col-auto">
                        <Link
                          to={`/profile`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          <span>Setting</span>
                        </Link>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-auto">
                        <i class="fa fa-user"></i>
                      </div>
                      <div className="col-auto">
                        <span>Contact</span>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-auto">
                        <i class="fa fa-phone"></i>
                      </div>
                      <div className="col-auto">
                        <Link
                          to={`/callhistory`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          <span>Cals</span>
                        </Link>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-auto">
                        <i class="fa fa-bookmark"></i>
                      </div>
                      <div className="col-auto">
                        <span>Save messages</span>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-auto">
                        <i class="fa fa-user-plus"></i>
                      </div>
                      <div className="col-auto">
                        <span>Invite Friends</span>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-auto">
                        <i class="fa fa-circle-question"></i>
                      </div>
                      <div className="col-auto">
                        <span>Telegram FAQ</span>
                      </div>
                    </div>
                    <hr />
                    <div className="text-center">
                      <button onClick={logout} className="button-logout">
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                <div className="row seacrh-container">
                  <div className="col">
                    <img
                      style={{ paddingTop: "9px", paddingLeft: "20px" }}
                      src={require("../../assets/images/Search.png")}
                      alt=""
                    />
                  </div>
                  <div className="col">
                    <input
                      className="search-input"
                      type="text"
                      placeholder="Type your message..."
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col" style={{ textAlign: "right" }}>
                <i
                  style={{
                    color: "#7E98DF",
                    fontSize: "22px",
                    paddingTop: "10px",
                  }}
                  class="fa fa-plus"
                ></i>
              </div>
            </div>
            <div className="row mt-5 text-center">
              <div className="col text-center section-all">
                <span>All</span>
              </div>
              <div className="col text-center section-important">
                <span>Important</span>
              </div>
              <div
                style={{ textAlign: "right" }}
                className="col text-center section-unread"
              >
                <span>Unread</span>
              </div>
            </div>
            <div className="container-custom-list-chat">
              {listuser.map((item, index) => (
                <div key={index} className="mt-4">
                  <div className="row">
                    <div className="col-auto">
                      <img
                        className="user-img-chat"
                        src={`${item.image}`}
                        alt=""
                      />
                    </div>

                    <div className="col-auto">
                      <button
                        onClick={() => selectReceiver(item)}
                        style={{
                          cursor: "pointer",
                          marginLeft: "-10px",
                          textAlign: "left",
                        }}
                      >
                        <div>
                          <h6>{item.username}</h6>
                        </div>
                      </button>
                    </div>

                    <div className="col" style={{ textAlign: "right" }}>
                      <div>
                      </div>
                      <div>
                        <span className="background-chat">
                          {Object.keys(listchat).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-9 rightside-chat">
            <div className="chat-topbar">
              <div className="row">
                <div className="col-auto">
                  <img
                    className="user-img-chat"
                    src={`${activeReceiver.image}`}
                    alt=""
                  />
                </div>
                <div className="col-auto">
                  <div>
                    <h6>{activeReceiver.username}</h6>
                  </div>
                  <div>
                    {activeReceiver.id_user == login.id_user ? (
                      <span style={{ color: "#7E98DF" }}>Online</span>
                    ) : (
                      <span style={{ color: "#7E98DF" }}>Offline</span>
                    )}
                  </div>
                </div>
                <div
                  className="col dropdown-chat-btn"
                  style={{ textAlign: "right", marginTop: "10px" }}
                >
                  <button
                    classname="dropdown-chat-btn"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    id="dropdownmenu"
                  >
                  </button>
                  <div
                    className="dropdown-menu chat-menu-dropdown"
                    aria-labelledby="dropdownmenu"
                  >
                    <div>
                      <div className="row">
                        <div className="col-auto">
                          <img
                            src={require("../../assets/images/Vector (2).png")}
                            alt=""
                          />
                        </div>
                        <div className="col-auto">
                          <Link
                            to={`/callhistory`}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            <span>Call</span>
                          </Link>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-auto">
                          <img
                            src={require("../../assets/images/Union (2).png")}
                            alt=""
                          />
                        </div>
                        <div className="col-auto">
                          <span>Delete chat history</span>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-auto">
                          <img
                            src={require("../../assets/images/Union (1).png")}
                            alt=""
                          />
                        </div>
                        <div className="col-auto">
                          <span>Mute notification</span>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-auto">
                          <img
                            src={require("../../assets/images/Search (1).png")}
                            alt=""
                          />
                        </div>
                        <div className="col-auto" style={{ color: "white" }}>
                          <input
                            style={{ color: "white" }}
                            className="search-input-chat"
                            type="text"
                            placeholder="Type your message..."
                            onChange={(e) => setQueryChat(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mainchat-container overflow-auto">
              {listchat == "" ? (
                <div
                  className="main-chat2 text-center"
                  style={{ paddingTop: "210px" }}
                >
                  <span className="text-secondary">Please Select Chat</span>
                </div>
              ) : (
                listchat.map((item, index) => (
                  <div key={index} className="main-chat2">
                    <div className="row">
                      {item.sender == login.username ? (
                        <div
                          className="col chat-sender-chat"
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <div className="row">
                            <div className="col">
                              <div className="row">
                                <div
                                  className="col-auto container-user-img-chat"
                                  type="button"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                  data-bs-toggle="dropdown"
                                  id="dropdownmenu"
                                >
                                  <img
                                    className="user-img-chat"
                                    src={`http://localhost:3005/${login.image}`}
                                    alt=""
                                  />
                                </div>
                                <div
                                  className="dropdown-menu dropdownmenu-custom"
                                  aria-labelledby="dropdownmenu"
                                >
                                  <div className="row">
                                    <div className="col-auto">
                                      <img
                                        src={require("../../assets/images/Union (2).png")}
                                        alt=""
                                      />
                                    </div>
                                    <div className="col-auto">
                                      <button
                                        className="delete-chat-btn"
                                        onClick={(e) =>
                                          deleteChat(item.id_chat, e)
                                        }
                                      >
                                        Delete chat
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="col senderchat-bg">
                                  <span>{item.message}</span>
                                </div>
                                <span
                                  className="text-secondary"
                                  style={{ textAlign: "right" }}
                                >
                                  {String(item.date_created).slice(11, 16)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="col response-chat-chat"
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <div className="row">
                            <div className="col">
                              <div className="row">
                                <div className="col responsechat-bg">
                                  <span>{item.message}</span>
                                </div>
                                <div className="col-auto">
                                  <img
                                    className="user-img-chat"
                                    // src={`http://localhost:3005/public/${activeReceiver.image}`}
                                    alt=""
                                  />
                                </div>
                                <span className="text-secondary">
                                  {String(item.date_created).slice(11, 16)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bottombar-chat">
              <div className="search-container-bottombar-chat">
                <div className="row">
                  <div className="col">
                    <form onSubmit={onSubmitMessage}>
                      <input
                        type="text"
                        className="type-message-container"
                        placeholder="Type your message.."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
