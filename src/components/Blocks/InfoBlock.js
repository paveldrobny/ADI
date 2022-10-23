import React from "react";
import "./Blocks.css";

function InfoBlock({ title, textData }) {
  return (
    <div className="info-block">
      <div className="info-block-title">{title}:</div>
      <div className="info-block-text-content">
        {textData.map((text) => {
          return <div className="info-block-text">{text}</div>;
        })}
      </div>
    </div>
  );
}

export default InfoBlock;
