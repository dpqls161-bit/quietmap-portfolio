// src/pages/MyPage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const MyPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>마이페이지</h2>
      <p>이메일: {user?.email}</p>
      <p>닉네임: {user?.displayName || "설정되지 않음"}</p>

      <div style={{ marginTop: 16 }}>
        <Link to="/reset-password">비밀번호 재설정</Link>
      </div>

      <div style={{ marginTop: 16 }}>
        <button onClick={handleLogout}>로그아웃</button>
      </div>

      <div style={{ marginTop: 16 }}>
        <Link to="/">메인으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default MyPage;