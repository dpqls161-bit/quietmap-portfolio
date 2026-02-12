import BottomNav from "../components/nav";
import "../styles/3style.css";
import HeaderTitle from "../components/3compo";
import  {LogoBox, LabeledInput,LabeledInput2, SubmitButton} from "../components/3compo";
import { useNavigate } from "react-router-dom";


export default function InquiryPage() {
  const navigate = useNavigate();
  return (


    <div className="inquiry-page">
      <HeaderTitle title="문의 페이지" />
      <LogoBox />

      <LabeledInput label = "이름" placeholder="문의자의 닉네임을 입력하세요."/>
      <LabeledInput label = "이메일" placeholder="답변받을 이메일을 입력하세요."/>
      <LabeledInput2 label = "문의 내용" placeholder = "문의 내용을 입력하세요."/>

      <SubmitButton label = "문의 보내기" onClick={()=>navigate("/complete")}/>
      <BottomNav />

    </div>
 
  );
}

