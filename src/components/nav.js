import { useNavigate } from "react-router-dom";
import "../css/nav.css";

export default function BottomNav() {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav">

      <div className="nav-item" onClick={() => navigate(-1)}>
        <div className="nav-icon">←</div>
      </div>  

      <div className="nav-item" onClick={()=>navigate("/login")}>
        <div className="nav-icon">🏠</div>
      </div>

      <div className="nav-item" onClick={()=>navigate("/mypage")}>
        <div className="nav-icon">👤</div>
      </div>

    </div>
  );
}
