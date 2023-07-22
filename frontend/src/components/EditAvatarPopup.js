import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const ref = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: ref.current.value,
    });
  }

  React.useEffect(() => {
    ref.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-edit"
      buttonText="Сохранить."
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-label">
        <input
          type="url"
          className="popup__input popup__input_type_link"
          name="avatar"
          id="avatar-input"
          placeholder="Ссылка на картинку"
          required
          ref={ref}
        />
        <span className="form__input-error avatar-input-error">
          Введите адрес сайта.
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
