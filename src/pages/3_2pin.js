import "../css/pin.css";
import BottomNav from "../components/nav";

export default function PinPage() {
  return (
    <div className="report-page">

      <div className="report-header">
        <div className="pin-icon">📍</div>
        <div className="text-box">
          <div className="header-title">공지사항</div>
          <div className="header-sub">QuietMap</div>
      </div></div>

      <div className="report-box">
        <h3 className="report-title">핀 신고 방법 안내</h3>

        <p className="report-text">
          안녕하세요! QuietMap입니다.<br/>
          조용한 길과 장소를 함께 만들어가는 데 도움을 주셔서 감사합니다.<br/>
          아래 내용을 참고하여 핀 신고를 쉽고 정확하게 해주세요.
          QuietMap에서는 지도 위 특정 장소의 소음과 혼잡 정도를 핀으로 표시할 수 있습니다.<br/>

          <span className="dot green"></span> 초록: 조용함, 편안하게 이동 가능 <br/>
          <span className="dot yellow"></span> 노랑: 보통, 약간의 소음 존재 <br/>
          <span className="dot red"></span> 빨강: 시끄러움, 혼잡·불편

          핀 신고 시 태그를 입력하면 다른 이용자가 상황을 쉽게 이해할 수 있습니다.<br/>
          예: “공사 중이라 시끄러움”, “음악 틀고 있음”
          <br/><b>신고 방법</b><br/>
          [지도를 열고 위치 확인 → 신고 버튼 클릭 → 소음 수준 선택 → 태그 입력 후 저장]

          정확한 위치와 소음 정보를 입력해 주세요.<br/>
          신고한 핀은 지도와 경로 검색에 반영되어 조용한 길 안내에도 도움을 줍니다.
        </p>
      </div>
      <BottomNav />
      
    </div>
  );
}




