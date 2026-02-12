// src/components/3_2compo.js
import { useState, useEffect } from "react";
import "../styles/3_2style.css";
import cat from "../cat.jpg";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";


export function ProfileSection() {
  const [name, setName] = useState("");   // 닉네임
  const [email, setEmail] = useState(""); // 이메일
  const [status, setStatus] = useState("...");

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      setName(user.displayName || "닉네임 없음");
      setEmail(user.email || "이메일 없음");
    }
  }, []);

  return (
    <div className="profile-section">
      <div className="profile-row">
        
        {/* 왼쪽 프로필 이미지 */}
        <div className="profile-left">
          <img src={cat} alt="profile" className="profile-img" />
        </div>

        {/* 오른쪽 프로필 정보 (수정 불가) */}
        <div className="profile-right">
          <div className="profile-box">{name}</div>
          <div className="profile-box">{email}</div>
        </div>

      </div>
    </div>
  );
}


export function MenuList() {
  const navigate = useNavigate();

  return (
    <div className="menu-list">
      <div className="menu-item" onClick={() => navigate("/privacy")}>
        <span className="menu-text">개인정보 처리방침</span>
        <span className="menu-arrow">›</span>
      </div>

      <div className="menu-item" onClick={() => navigate("/pin")}>
        <span className="menu-text">핀 신고하는 방법</span>
        <span className="menu-arrow">›</span>
      </div>

      <div className="menu-item" onClick={() => navigate("/logout")}>
        <span className="menu-text">로그아웃</span>
        <span className="menu-arrow">›</span>
      </div>

    </div>
  );
}

