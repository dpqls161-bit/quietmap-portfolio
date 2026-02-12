import { AuthProvider } from "./context/AuthContext";
import {Routes, Route } from "react-router-dom";
import InquiryPage from "./pages/3_1main";
import InquiryCompletePage from "./pages/3_1_2main";
import MyPage from "./pages/3_2main";
import PrivacyPage from "./pages/3_2privacy";
import PinPage from "./pages/3_2pin";
import LogoutPage from "./pages/3_2logout";
import SecurityPage from "./pages/3_2security";
import MapPage1 from "./pages/mappage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MainView from "./pages/MainView";
import Tag from "./pages/TagPage";

import Real from "./components/PinDetailModal";

function App() {
  return (
    <AuthProvider>
    <Routes>
      <Route path = "/" element={<LoginPage/>}/>
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/contact" element={<InquiryPage />} /> 
      <Route path="/complete" element={<InquiryCompletePage />} />
      <Route path="/mypage" element={<MyPage />} />

      <Route path="/privacy" element={<PrivacyPage/>} />
      <Route path="/pin" element={<PinPage/>} />
      <Route path="/logout" element={<LogoutPage/>} />
      <Route path="/security" element={<SecurityPage/>} />

      <Route path="/map" element={<MapPage1/>}/>

      <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/main" element={<MainView/>}/>
      <Route path="/real" element={<Real/>}/>
      <Route path="tag" element={<Tag/>}/>

    </Routes>
    </AuthProvider>
  );
}

export default App;
