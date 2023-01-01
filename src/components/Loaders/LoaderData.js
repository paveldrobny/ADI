import React from "react";

function LoaderData() {
  return (
    <div className="message-loading">
      <div>Загрузка данных...</div>
      <div className="message-desc">
        Длительная загрузка может означать проблемы с подключением к серверу
      </div>
    </div>
  );
}

export default LoaderData;
