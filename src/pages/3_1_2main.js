import "../styles/3style.css";
import HeaderTitle from "../components/3compo";
import  {LogoBox} from "../components/3compo";
import BottomNav from "../components/nav";


export default function InquiryCompletePage() {
  return (
    <div className="inquiry-page">
      <HeaderTitle title="문의 페이지" />
      <LogoBox />
    <div className="complete-box">
        <p>문의에 감사드립니다.<br/> 
        QUIET MAP은 언제나 이용자분들의 의견을 적극적으로 검토하고 있습니다. <br/><br/>
        문의주신 내용은 빠른 시일 내에 답장드릴 수 있도록 노력하겠습니다. <br/><br/>
        접수하신 문의는 최소 1~2일 안에 메일로 답변드릴 예정입니다.<br/><br/>
        입력하신 메일 주소의 메일함을 확인해주시길 바랍니다. <br/><br/>
        감사합니다.<br/><br/>
        </p>
    </div>
    <BottomNav />   
</div>
  );
}

