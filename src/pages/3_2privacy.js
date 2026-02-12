import "../styles/privacy.css";
import BottomNav from "../components/nav";


export default function PrivacyPage() {

  return (
    <div className="privacy-page">
      <div className="privacy-header">
        <div className="header-title"><br/>개인정보처리방침 </div>
      </div>
    <br/><br/>
      
      <div className="content-box">
        <h3 className="content-title">[ 개인정보처리방침 ] — QuietMap</h3>
              <hr className="divider" />


        <p className="content-text">
          QuietMap(이하 “앱”)은 이용자의 개인정보를 존중하며, 아래와 같이 개인정보 처리방침을 안내합니다.
             
          서비스 제공을 위해 최소한의 개인정보를 수집합니다.<br/>
          - 위치 정보: 출발지·도착지 및 핀 신고 위치<br/>
          - 앱 사용 기록: 경로 검색 기록, 핀 신고 기록

          앱은 수집한 개인정보를 다음 목적에 사용합니다.<br/>
          1. 소음/혼잡 지도 구축 및 업데이트<br/>
          2. 앱 기능 개선 및 통계 분석<br/>
          3. 서비스 문의 대응 및 알림 전달

          수집된 개인정보는 사용자가 계정을 삭제하거나 앱 이용을 종료할 경우 즉시 삭제됩니다.

          위치 정보는 지도 내 핀 계산에만 사용되며, 외부로 공유되지 않습니다.
          개인정보처리방침이 변경될 경우 앱 공지 <br/>또는 업데이트 안내를 통해 사전 고지합니다.
        </p>
      </div>
      <BottomNav />
      
    </div>
  );
}
