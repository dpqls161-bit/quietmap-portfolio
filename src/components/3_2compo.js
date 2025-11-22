import { useState } from "react";
import "../css/3_2style.css";
import cat from "../cat.jpg"; 
import { useNavigate } from "react-router-dom";


export function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("입맛까다로운고양이");
  const [email, setEmail] = useState("dobongzip@gmail.com");
  const [status, setStatus] = useState("...");

  return (
    <div className="profile-section">
      <div className="profile-row">
        <div className="profile-left">
          <img src={cat} alt="profile" className="profile-img" />
          
          {!isEditing && (
            <div className="edit-row" onClick={() => setIsEditing(true)}>
              <span className="edit-icon">⚙</span>
              <span className="edit-text">편집하기</span>
            </div>
          )}
        </div>
        
        <div className="profile-right">
          {isEditing ? (
            <>
              <input
                className="profile-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="닉네임 입력"
              />

              <input
                className="profile-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 입력"
              />

              <input
                className="profile-input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="내 상태 입력"
              />

              <div
                className="edit-complete"
                onClick={() => setIsEditing(false)}
              >
                ✔ 완료
              </div>
            </>
          ) : (
            <>
              <div className="profile-box">{name}</div>
              <div className="profile-box">{email}</div>
              <div className="profile-box">내 상태 : {status}</div>
            </>
          )}
        </div>
      </div>        
    </div>
  );
}
//메뉴 구현하기

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

      <div className="menu-item" onClick={() => navigate("/security")}>
        <span className="menu-text">보안 관리</span>
        <span className="menu-arrow">›</span>
      </div>
    </div>
  );
}

