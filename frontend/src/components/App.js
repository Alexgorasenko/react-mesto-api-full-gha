import React, { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import * as apiAuth from "../utils/apiAuth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setСards] = useState([]);
  const [tooltipMessage, setTooltipMessage] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setСurrentUser(data);
      })
      .catch((err) => {
        console.log(`Ошибка сервера ${err}`);
      });

    api
      .getPlaceCards()
      .then((data) => {
        setСards(data);
      })
      .catch((err) => {
        console.log(`Ошибка сервера ${err}`);
      });
  }, [token]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          setСards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.log);
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setСards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch(console.log);
    }
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setСards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch(console.log);
  };

  const handleUpdateUser = (avatar) => {
    api
      .patchUserInfo(avatar)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка сервера ${err}`);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .patchAvatar(data)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка сервера ${err}`);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .postNewCard(data)
      .then((newCard) => {
        setСards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка сервера ${err}`);
      });
  };

  const handleEditAvatarClick = () => {
    setAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setAvatarPopupOpen(false);
    setSelectedCard(null);
    setTooltipMessage(null);
  }

  const handleRegister = ({ password, email }) => {
    apiAuth
      .register(password, email)
      .then(() => {
        setTooltipMessage({
          isSuccess: true,
          text: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in");
      })
      .catch((err) => {
        setTooltipMessage({
          isSuccess: false,
          text: "Что-то пошло не так!Попробуйте ещё раз.",
        });
        console.log(`Ошибка сервера ${err}`);
      });
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const tockenCheck = () => {
    
    console.log(token);

    if (token) {
      apiAuth
        .getContent(token)
        .then((data) => {
          setUserData(data.data.email);
          handleLogin();
          navigate("/");
        })
        .catch((err) => {
          console.log(`Ошибка сервера ${err}`);
        });
    } else {
      console.log("ошибка получения токена");
    }
  };

  useEffect(() => {
    tockenCheck();
  }, [token]);

  const handleAuthorize = ({ password, email }) => {
    apiAuth
      .authorize(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        navigate("/");
        handleLogin();
      })

      .catch((err) => {
        console.log(`Ошибка сервера ${err}`);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header signOut={signOut} userData={userData} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
                element={Main}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <div className="loginContainer">
                <Login handleAuthorize={handleAuthorize} />
              </div>
            }
          />

          <Route
            path="/sign-up"
            element={
              <div className="loginContainer">
                <Register handleRegister={handleRegister} />
              </div>
            }
          />
        </Routes>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <ImagePopup
          name="img"
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={selectedCard}
        />
      </div>
      <InfoTooltip onClose={closeAllPopups} tooltipMessage={tooltipMessage} />
    </CurrentUserContext.Provider>
  );
}

export default App;
