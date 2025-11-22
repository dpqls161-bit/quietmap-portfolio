
import "../css/3style.css";

 //맨 위 문의페이지 텍스트
export default function HeaderTitle({ title }) {
  return (
    <div className="HeaderTitle">
      {title}
    </div>
  );
}

//핀 로고 이미지, Quiet MAP 버튼(빨간색)
export function LogoBox() {
  return (
    <div className="logo-box">
      <div className="logo-pin">📍</div>

      <div className="logo-red-box">
        QUIET MAP
      </div>
    </div>
  );
}


//입력 (이름, 이메일)
export function LabeledInput({ label, placeholder, placeholder2 }) {
  return (
    <div className="input-container">
    <div className="input-label">{label}</div>

    <input className="input-box" placeholder={placeholder} />

    </div>
  );
}

// 입력(문의 내용)
export function LabeledInput2({ label, placeholder }) {
  return (
    <div className="textarea-container">
      <div className="textarea-label">{label}</div>
      <textarea
        className="textarea-box"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}


export function SubmitButton({ label, onClick }) {
  return (
    <div className="submit-btn-wrapper">
    <button className = "submit-btn" onClick={onClick}>
        {label}
        </button>

    </div>
  );
}




