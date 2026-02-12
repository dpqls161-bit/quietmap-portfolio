// src/pages/MainView.jsx
import React from "react";
import BottomNav from "../components/nav";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainView = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // 로그아웃 버튼
  const handleLogout = async () => {
    try {
      await logout();         
      navigate("/login");      
    } catch (err) {
      console.error("로그아웃 오류:", err);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  const handleTodo = (msg) => {
    alert(`${msg} 기능은 추후 구현 예정입니다 :)`);
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-header-inner">
          <div className="home-header-circle">
            <h1 className="home-header-title">
              QUIET MAP
              <br />
              LIST
            </h1>
          </div>
        </div>
      </header>


      <main className="home-main">
        <div className="home-grid">
          {/* 1.  로그아웃 버튼 */}
          <button
            className="home-card home-card-pink"
            type="button"
            onClick={handleLogout}
          >
            <div className="home-card-icon">👋</div>
            <div className="home-card-label">
              <span>로그아웃</span>
              <span className="home-card-arrow">&gt;</span>
            </div>
          </button>



{/* 2. 실시간 번잡한 장소 현황 보기, 핀 찍기 */}
<button
  className="home-card home-card-yellow"
  type="button"
  onClick={() => navigate("/map")}   
>
  <div className="home-card-icon">👥</div>
  <div className="home-card-label">
    <span>실시간 번잡한 장소</span>
    <span>현황 보기, 핀 찍기 &gt;</span>
  </div>
</button>

{/* 3. 장소에 상세 태그 달기 */}
<button
  className="home-card home-card-green"
  type="button"
  onClick={() => navigate("/tag")}          
>
  <div className="home-card-icon">🏷️</div>
  <div className="home-card-label">
    <span>장소에 상세 태그</span>
    <span>달기 &gt;</span>
  </div>
</button>


          {/* 4. 문의하기*/}
          <button
            className="home-card home-card-blue"
            type="button"
            onClick={() => navigate("/contact")}
          >
            <div className="home-card-icon">✉️</div>
            <div className="home-card-label">
              <span>문의하기</span>
              <span className="home-card-arrow">&gt;</span>
            </div>
          </button>
        </div>
      </main>

      <BottomNav />

    </div>
  );
};

export default MainView;

