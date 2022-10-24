import React from "react";
import "./Profile.css";

const ProfileInfo = ({ title, text }) => {
  return (
    <div className="profile-info">
      <div className="profile-info-title">{title}</div>
      <div>{text}</div>
    </div>
  );
};

export default ProfileInfo;
