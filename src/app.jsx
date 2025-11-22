// src/App.jsx

import RealtimeMapPage from "./pages/RealtimeMapPage";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

import MainView from "./pages/MainView"; // 메인 뷰 (카드 4개 화면)
import MapPage from "./pages/MapPage";   // 지도 페이지

// 로그인한 유저만 접근 가능하게 하는 보호 라우트
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Firebase 초기 로그인 상태 확인 중
  if (loading) {
    // 로딩 스피너나 "로딩중..." 같은 UI를 넣어도 좋음
    return null;
  }

  // 로그인 안 되어 있으면 /login으로 이동
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 로그인 되어 있으면 children(실제 페이지) 렌더링
  return children;
};

const App = () => {
  return (
    <Routes>
      {/* 처음 접속하면 /login으로 리다이렉트 */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 로그인 / 회원가입 / 비밀번호 재설정 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* 로그인 성공 후 메인뷰 (카드 4개 있는 화면) */}
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <MainView />
          </ProtectedRoute>
        }
      />
      {/* 실시간 번잡한 장소 현황 보기 + 핀 찍기 지도 페이지 */}
            <Route
              path="/realtime"
              element={
                <ProtectedRoute>
                  <RealtimeMapPage />
                </ProtectedRoute>
              }
            />
            
      {/* 지도 페이지 (장소에 상세 태그 달기 → /map 으로 이동해서 여기 렌더링) */}
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        }
      />

      {/* 그 외 모든 잘못된 경로 → /login 으로 보내기 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;