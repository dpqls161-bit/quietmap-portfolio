
import "../css/3_2style.css";
import { MenuList, ProfileSection } from "../components/3_2compo";
import BottomNav from "../components/nav";


export default function MyPage() {
  return (
    <div className="mypage">
      <ProfileSection />
      <MenuList />
      <BottomNav />

    </div>
  );
}
