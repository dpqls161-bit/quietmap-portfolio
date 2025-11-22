// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // ⭐ AuthContext에서 로그인 함수 가져오기

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
    // TODO: 비회원 플로우 넣으려면 여기서 /map 등으로 이동
    navigate("/");
  };

  return (
    <div className="auth-page">
      {/* 위쪽 꾸미기 라인 대신 여백만 */}
      <div className="auth-top-space" />

      <div className="auth-card">
        {/* 핀 아이콘 */}
        <div className="auth-pin-wrapper">
          <div className="auth-pin-body" />
          <div className="auth-pin-shadow" />
        </div>

        {/* 폼 */}
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

      {/* 하단 회원가입 영역 */}
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