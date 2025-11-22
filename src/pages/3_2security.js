// src/pages/ResetPasswordPage.jsx
import "../index2.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/nav";


const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordCheck, setNewPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!currentPassword || !newPassword || !newPasswordCheck) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    if (newPassword !== newPasswordCheck) {
      setError("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 6 || newPassword.length > 20) {
      setError("비밀번호는 6~20자 사이여야 합니다.");
      return;
    }

    // TODO: 실제 Firebase 비밀번호 변경 로직 연동 (updatePassword 등)
    // 지금은 UI 데모이므로 성공 메시지만 보여줌
    setMessage("비밀번호 변경 요청이 저장되었습니다. (데모 화면)");
  };

  return (
    <div className="security-page">
     

      {/* 내용 영역 */}
      <main className="security-main">
        <form className="security-card" onSubmit={handleSubmit}>
          <div className="security-field">
            <label>현재 비밀번호</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="security-field">
            <label>새 비밀번호</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="security-field">
            <label>비밀번호 확인</label>
            <input
              type="password"
              value={newPasswordCheck}
              onChange={(e) => setNewPasswordCheck(e.target.value)}
            />
          </div>

          <p className="security-hint">
            6~20자 / 영문 대문자, 소문자, 특수문자 중 2가지 이상 조합
          </p>

          {error && <p className="security-error">{error}</p>}
          {message && <p className="security-message">{message}</p>}

          <button type="submit" className="security-save-btn">
            저장
          </button>
        </form>
      </main>

      <BottomNav />

    </div>
  );
};

export default ResetPasswordPage;