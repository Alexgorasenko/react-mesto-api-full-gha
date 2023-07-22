import React from "react";
import success from "../images/success.png";
import failure from "../images/failure.png";

function InfoTooltip({ tooltipMessage, onClose }) {
  return (
    <div
      className={`popup popup_type_info ${tooltipMessage && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          aria-label="Закрытие попапа"
          type="button"
          className="popup__close popup-img__close"
          onClick={onClose}
        ></button>
        <img
          className="popup__info-img"
          src={tooltipMessage?.isSuccess ? success : failure}
        />
        <h3 className="popup__info-header">{tooltipMessage?.text}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
