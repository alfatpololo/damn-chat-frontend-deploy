import React from "react";
import "./messenger.css";

const Messanger = () => {
  return (
    <section>
      <div className="messenger">
        <div className="chat-menu">
          <div className="chat-menu-wrapper">
            <input
              placeholder="Search for friends"
              className="chat-menu-input"
            />
          </div>
        </div>
        <div className="chat-box">
          <div className="chat-box-wrapper"></div>
        </div>
        <div className="online-chat">
          <div className="online-chat-wrapper"></div>
        </div>
      </div>
    </section>
  );
};

export default Messanger;
