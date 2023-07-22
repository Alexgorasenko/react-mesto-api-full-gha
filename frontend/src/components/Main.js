import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUserInfo = React.useContext(CurrentUserContext);

  return (
      <main className="content">
        <section className="profile">
          <div className="profile__information">
            <div className="profile__avatar-container">
              <img
                src={currentUserInfo.avatar}
                alt={currentUserInfo.name}
                className="profile__avatar"
              />
              <button
                className="profile__avatar-edit"
                aria-label="Редактирование аватара профиля"
                type="button"
                onClick={props.onEditAvatar}
              ></button>
            </div>
            <div className="profile__description">
              <div className="profile__editing">
                <h1 className="profile__name">{currentUserInfo.name}</h1>
                <button
                  aria-label="Добавление места "
                  type="button"
                  className="profile__button profile__button_type_edit"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <p className="profile__vocation">{currentUserInfo.about}</p>
            </div>
          </div>
          <button
            aria-label="Добавление места"
            type="button"
            className="profile__add"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="places">
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </section>
      </main>
  );
}

export default Main;
