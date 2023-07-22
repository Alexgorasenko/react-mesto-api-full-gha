import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup-img ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup-img__container">
        <button
          aria-label="Закрытие попапа"
          type="button"
          className="popup__close popup-img__close"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card?.link}
          alt={props.card?.name}
          className="popup-img__image"
        />
        <h3 className="popup-img__header">{props.card && props.card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
