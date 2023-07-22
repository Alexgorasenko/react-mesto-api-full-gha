import React from "react";
import logo from "../logo.svg";
import { Route, Routes, Link } from "react-router-dom";

function Header({ signOut, userData }) {
  return (
    <header className="header">
      <img src={logo} alt="Место Россия" className="header__logo" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__nav-link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__nav-link">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__user-data">
              <p className="header__user-email">{userData}</p>
              <button className="header__logout" onClick={signOut}>
                Выйти
              </button>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
