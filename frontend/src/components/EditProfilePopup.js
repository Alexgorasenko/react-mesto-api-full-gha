import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUserInfo = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    setName(currentUserInfo.name);
    setDescription(currentUserInfo.about);
  }, [currentUserInfo, props.isOpen]);

  function handleNameOnChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionOnChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="editing"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-label">
        <input
          type="text"
          className="popup__input popup__input_type_name"
          name="name"
          placeholder="Введите имя"
          id="name-input"
          required
          onChange={handleNameOnChange}
          value={name || ""}
        />
        <span className="form__input-error name-input-error">
          Вы пропустили это поле.
        </span>
      </label>
      <label className="popup__form-label">
        <input
          type="text"
          className="popup__input popup__input_type_vocation"
          name="about"
          placeholder="Введите описание"
          id="vocation-input"
          required
          onChange={handleDescriptionOnChange}
          value={description || ""}
        />
        <span className="form__input-error vocation-input-error">
          Вы пропустили это поле.
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
