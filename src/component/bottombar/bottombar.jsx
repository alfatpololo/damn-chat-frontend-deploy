import React from "react";
import { Link } from "react-router-dom";

const BottomBar = () => {
  return (
    <div className="bottombar-chat mt-5">
      <div className="search-container-bottombar-chat">
        <div className="row">
          <div className="col">
            <form>
              <input
                type="text"
                className="type-message-container"
                placeholder="Type your message.."
              />
            </form>
          </div>
          <div className="col-auto" style={{ textAlign: "right" }}>
            <div className="row">
              <div className="col-auto bottombar-chat-btn dropup">
                <button
                  classname="dropdown-chat-btn"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  id="dropdownmenu"
                >
                  <img
                    className="icon-chat"
                    src={require("../../assets/images/Plus.png")}
                    alt=""
                  />
                </button>
                <div
                  className="dropdown-menu dropdownmenu-attachment-chat"
                  aria-labelledby="dropdownmenu"
                >
                  <div>
                    <div className="row">
                      <div className="col-auto">
                        <img
                          src={require("../../assets/images/Image.png")}
                          alt=""
                        />
                      </div>
                      <div className="col-auto">
                        <Link
                          to={`/callhistory`}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >
                          <span>Image</span>
                        </Link>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-auto">
                        <img
                          src={require("../../assets/images/Documents.png")}
                          alt=""
                        />
                      </div>
                      <div className="col-auto">
                        <span>Documents</span>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-auto">
                        <img
                          src={require("../../assets/images/Contacts.png")}
                          alt=""
                        />
                      </div>
                      <div className="col-auto">
                        <span>Contacts</span>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-auto">
                        <img
                          src={require("../../assets/images/Location.png")}
                          alt=""
                        />
                      </div>
                      <div className="col-auto">
                        <span>Location</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <img
                  className="icon-chat"
                  src={require("../../assets/images/Vector (3).png")}
                  alt=""
                />
              </div>

              <div className="col-auto">
                <img
                  className="icon-chat"
                  src={require("../../assets/images/Group 181.png")}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
