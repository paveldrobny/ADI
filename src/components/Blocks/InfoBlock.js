import React from "react";
import "./Blocks.css";

function InfoBlock({ title, textData }) {
  console.log(typeof title);
  return (
    <div className="info-block">
      <div className="info-block-title">{title}:</div>
      <div className="info-block-text-content">
        {typeof textData === "object" ? (
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
