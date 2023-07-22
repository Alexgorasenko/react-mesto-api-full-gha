import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login({ handleAuthorize }) {
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
    handleAuthorize(formValue);
  };

  return (
    <div className="auth">
      <p className="auth__header">Вход</p>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
