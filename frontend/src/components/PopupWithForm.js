import React from "react";

function PopupWithForm({
  title,
  name,
  buttonText,
  children,
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          aria-label="Закрытие попапа"
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <h3 className="popup__header">{title}</h3>
        <form
          name={`form-${name}`}
          method="post"
          className="popup__form"
          id={`form-${name}`}
          action="/"
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__save popup-editing__save">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
