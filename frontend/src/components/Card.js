import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUserInfo = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUserInfo._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUserInfo._id);

  const cardLikeButtonClassName = `place-card__like ${
    isLiked && "place-card__like_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="place-card">
      <div className="place-card__picture">
        <img
          src={props.card.link}
          alt={props.card.name}
          className="place-card__image"
          onClick={handleClick}
        />
        {isOwn && (
          <button className="place-card__delete" onClick={handleDeleteClick} />
        )}
      </div>
      <div className="place-card__description">
        <h2 className="place-card__title">{props.card.name}</h2>
        <div className="place-card__like-container">
          <button
            aria-label="Кнопка понравилось"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="place-card__like-count">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
