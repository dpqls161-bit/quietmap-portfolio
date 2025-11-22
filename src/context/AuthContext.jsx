// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase 로그인 상태 변화 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ⭐ 로그인 함수
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ⭐ 회원가입 함수
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ⭐ 비밀번호 재설정 함수
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // 로그아웃
  const logout = () => signOut(auth);

  const value = {
    user,
    loading,
    login,
    signup,
    resetPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);