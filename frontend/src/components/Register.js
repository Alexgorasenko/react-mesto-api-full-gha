import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);

    handleRegister(formValue);
  };

  return (
    <div className="auth">
      <p className="auth__header">Регистрация</p>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          id="email"
          required
          name="email"
          type="text"
          autoComplete="login"
          className="auth__input"
          placeholder="Email"
          value={formValue.email || ""}
          onChange={handleChange}
        />
        <input
          id="password"
          required
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Пароль"
          className="auth__input"
          value={formValue.password || ""}
          onChange={handleChange}
        />
        <button type="submit" className="auth__button">
          Зарегистрироваться
        </button>
      </form>

      <div className="auth__signin">
        <p className="auth__signin-text">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="auth__signin-link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
