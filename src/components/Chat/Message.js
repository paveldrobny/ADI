import React from "react";
import "./Chat.css";

function Message({ self, name, text, date }) {
  return (
    <div className={`chat-message ${self ? "self" : ""}`}>
      <div className={`chat-message-content ${self ? "self" : ""}`}>
        <div className={`chat-message-name ${self ? "self" : ""}`}>{name}</div>
        <div className="chat-message-text">{text}</div>
        <div className="chat-message-date">{date}</div>
      </div>
    </div>
  );
}

export default Message;
