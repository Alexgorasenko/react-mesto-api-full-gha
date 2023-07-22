import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const refName = React.useRef();
  const refLink = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: refName.current.value,
      link: refLink.current.value,
    });
  }

  React.useEffect(() => {
    refName.current.value = "";
    refLink.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      buttonText="Cоздать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-label">
        <input
          required
          type="text"
          className="popup__input popup__input_type_title"
          name="name"
          id="title-input"
          placeholder="Название"
          ref={refName}
        />
        <span className="form__input-error title-input-error">
          Вы пропустили это поле.
        </span>
      </label>
      <label className="popup__form-label">
        <input
          type="url"
          className="popup__input popup__input_type_link"
          name="link"
          id="link-input"
          placeholder="Ссылка на картинку"
          required
          ref={refLink}
        />
        <span className="form__input-error link-input-error">
          Введите адрес сайта.
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
