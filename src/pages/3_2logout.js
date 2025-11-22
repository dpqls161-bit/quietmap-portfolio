// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Firebase 로그인
      await login(email, password);
      navigate("/main"); // 로그인 성공 시 메인뷰로 이동
    } catch (err) {
      console.error(err);
      setError("이메일 또는 비밀번호를 다시 확인해주세요.");
    }
  };

  const handleGuestStart = () => {

    navigate("/");
  };

  return (
    <div className="auth-page">

      <div className="auth-top-space" />

      <div className="auth-card">

        <div className="auth-pin-wrapper">
          <div className="auth-pin-body" />
          <div className="auth-pin-shadow" />
        </div>
    
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="아이디"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="비밀번호"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">
            로그인
          </button>
        </form>
        </div>

      <div className="auth-bottom">
        <span>아직 회원이 아니신가요?</span>
        <Link to="/signup" className="auth-bottom-signup">
          회원가입
        </Link>
      </div>
    </div>
  );
};


export default LoginPage;
