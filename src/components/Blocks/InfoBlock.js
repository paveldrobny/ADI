import React from "react";
import "./Blocks.css";

function InfoBlock({ title, textData, isDate }) {
  return (
    <div className="info-block">
      <div className="info-block-title">{title}:</div>
      <div className="info-block-text-content">
        {typeof textData === "object" && isDate === false ? (
          textData.map((text) => {
            return (
              <div key={text} className="info-block-text">
                {text}
              </div>
            );
          })
        ) : (
          <div className="info-block-text">{textData}</div>
        )}
      </div>
    </div>
  );
}

export default InfoBlock;
