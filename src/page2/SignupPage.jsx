// src/pages/SignupPage.jsx
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");        // 이름
  const [userId, setUserId] = useState("");    // 아이디
  const [email, setEmail] = useState("");      // 이메일
  const [password, setPassword] = useState(""); 
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !userId || !email || !password || !passwordCheck) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Firebase 프로필에 이름/아이디 저장 (간단히 묶어서 저장)
      await updateProfile(userCred.user, {
        displayName: `${name} (${userId})`,
      });

      alert("회원가입이 완료되었습니다. 로그인 해 주세요.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-page">
      <div className="auth-top-space" />

      <div className="signup-card">
        {/* 위쪽 핀 + 손가락 아이콘 자리 (핀만 구현) */}
        <div className="auth-pin-wrapper">
          <div className="auth-pin-body" />
          <div className="auth-pin-shadow" />
        </div>

        {/* QUIET MAP 로고 버튼 */}
        <button type="button" className="signup-logo-btn">
          QUIET MAP
        </button>

        {/* 폼 */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-field">
            <label className="signup-label">이름</label>
            <input
              className="auth-input"
              type="text"
              placeholder="학번을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="signup-field">
            <label className="signup-label">아이디</label>
            <input
              className="auth-input"
              type="text"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="signup-field">
            <label className="signup-label">이메일</label>
            <input
              className="auth-input"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="signup-field">
            <label className="signup-label">비밀번호</label>
            <input
              className="auth-input"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="signup-field">
            <label className="signup-label">비밀번호 확인</label>
            <input
              className="auth-input"
              type="password"
              placeholder="비밀번호를 한번 더 입력하세요"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
          </div>

          {error && <p className="signup-error">{error}</p>}

          <button type="submit" className="signup-submit-btn">
            회원가입
          </button>
        </form>

        {/* 이미 계정 있을 때 로그인으로 */}
        <div className="signup-bottom-link">
          <span>이미 계정이 있으신가요?</span>
          <Link to="/login" className="signup-bottom-login">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;