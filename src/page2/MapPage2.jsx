// src/pages/MapPage2.jsx

import React, { useEffect, useState, useRef } from "react";
import "../css/mapstyle.css";
import PinDetailModal from "../compo2/PinDetailModal";
import { auth } from "../firebase";

/* global kakao */

// 백엔드 플라스크 서버 주소 (필요에 따라 바꿔도 됨)
const API_BASE = "https://preaortic-paratactically-marti.ngrok-free.dev";

// 카카오 지도 Javascript 키
const KAKAO_APP_KEY = "dd96fd83e389eb2ab48568d67c9ec1cc";

const MapPage = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const selectedColorRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  // 핀 등록 모달 (사진 업로드 + 첫 의견/태그)
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [tempLatLng, setTempLatLng] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tagText, setTagText] = useState("");

  // 핀 상세 보기 모달 (사진 + 태그 + 내 태그 추가하기)
  const [selectedPin, setSelectedPin] = useState(null);

  // 지도 위 마커들
  const markersRef = useRef([]);

  // ✅ 카카오 스크립트 로드 후 initMap 실행
  useEffect(() => {

    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 SDK가 로드되지 않았습니다. index.html 설정을 확인하세요.");
      return;
    }

    window.kakao.maps.load(() => {
      initMap();
    });
  }, []);



  // 🔍 지도 초기화 + 핀 로딩
  const initMap = () => {
    const container = document.getElementById("map");
    if (!container) return;

    const options = {
      center: new kakao.maps.LatLng(37.651996, 127.016508),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    window.map = map;

    const dragBounds = new kakao.maps.LatLngBounds(
      new kakao.maps.LatLng(37.6505, 127.0148),
      new kakao.maps.LatLng(37.6536, 127.0195)
    );

    const pinBounds = new kakao.maps.LatLngBounds(
      new kakao.maps.LatLng(37.6485, 127.0144),
      new kakao.maps.LatLng(37.6536, 127.0198)
    );

    // 드래그 제한
    kakao.maps.event.addListener(map, "dragend", () => {
      const center = map.getCenter();
      if (!dragBounds.contain(center)) {
        map.setCenter(new kakao.maps.LatLng(37.651996, 127.016508));
      }
    });

    // 지도 클릭 → 핀 등록 모달 열기
    kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      const latlng = mouseEvent.latLng;
      const color = selectedColorRef.current;

      if (!pinBounds.contain(latlng)) {
        alert("캠퍼스 밖은 불가능합니다.");
        return;
      }

      if (!color) {
        alert("핀 색상을 먼저 선택하세요!");
        return;
      }

      setTempLatLng(latlng);
      setShowRegisterModal(true);
    });

    // 처음 & idle(지도 이동/줌 후) 마다 핀 다시 로딩
    loadPinsFromBackend(map);
    kakao.maps.event.addListener(map, "idle", () => {
      loadPinsFromBackend(map);
    });
  };

  // level ↔ color 변환
  const levelToColor = (level) => {
    if (level === "quiet") return "green";
    if (level === "normal") return "yellow";
    if (level === "loud") return "red";
    return "green";
  };

  const colorToLevel = (color) => {
    if (color === "green") return "quiet";
    if (color === "yellow") return "normal";
    if (color === "red") return "loud";
    return "normal";
  };

  // 🔁 백엔드에서 핀 목록 가져와 마커 찍기
  const loadPinsFromBackend = async (map) => {
    if (!map) return;

    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const params = new URLSearchParams({
      min_lat: sw.getLat(),
      max_lat: ne.getLat(),
      min_lng: sw.getLng(),
      max_lng: ne.getLng(),
    });

    try {
      const res = await fetch(`${API_BASE}/api/pins/?${params.toString()}`, {
        credentials: "include",
      });
      if (!res.ok) return;

      const pins = await res.json();

      // 기존 마커 제거
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];

      pins.forEach((pin) => {
        const color = levelToColor(pin.level);
        const imageSrc = `/${color}.png`; // public/green.png, yellow.png, red.png
        const imageSize = new kakao.maps.Size(32, 32);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(pin.lat, pin.lng),
          map,
          image: markerImage,
        });

        // ✅ 마커 클릭하면 상세 모달 뜸
        kakao.maps.event.addListener(marker, "click", () => {
          setSelectedPin(pin);
        });

        markersRef.current.push(marker);
      });
    } catch (err) {
      console.error("핀 불러오기 실패:", err);
    }
  };

  // 📝 핀 등록 모달에서 [등록] 버튼
  const handleSubmitPin = async () => {
    if (!selectedFile) {
      alert("사진을 업로드하세요.");
      return;
    }
    if (!tagText.trim()) {
      alert("의견을 입력하세요.");
      return;
    }
    if (!tempLatLng) return;

    const level = colorToLevel(selectedColorRef.current);

    const formData = new FormData();
    formData.append("latitude", tempLatLng.getLat());
    formData.append("longitude", tempLatLng.getLng());
    formData.append("level", level);        // quiet / normal / loud
    formData.append("tags", tagText);       // 첫 태그/의견
    formData.append("photo", selectedFile); // request.files["photo"]

    try {
      const res = await fetch(`${API_BASE}/api/pins/create`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("핀 생성 실패:", data);
        alert(data.error || "핀 등록 실패");
        return;
      }

      alert("핀이 등록되었어요!");

      if (window.map) {
        loadPinsFromBackend(window.map);
      }
    } catch (err) {
      console.error("요청 중 오류:", err);
      alert("서버 요청 중 오류가 발생했습니다.");
    }

    // 모달 리셋
    setShowRegisterModal(false);
    setSelectedFile(null);
    setTagText("");
    setSelectedColor(null);
    selectedColorRef.current = null;
    setTempLatLng(null);
  };

  return (
    <div className="map-wrapper">
      {/* 우측 상단 핀찍기 버튼 */}
      <div className="pin-main-button" onClick={() => setShowMenu(!showMenu)}>
        핀찍기
      </div>

      {/* 색상 선택 메뉴 */}
      {showMenu && (
        <div className="pin-color-menu">
          <div
            className="pin-color red"
            onClick={() => handleColorSelect("red")}
          />
          <div
            className="pin-color yellow"
            onClick={() => handleColorSelect("yellow")}
          />
          <div
            className="pin-color green"
            onClick={() => handleColorSelect("green")}
          />
        </div>
      )}

      {/* 핀 정보 입력 모달 (사진 + 의견) */}
      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>핀 정보 등록</h3>

            <label>사진 업로드</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            <label>의견 / 태그 입력</label>
            <textarea
              placeholder="예) 12-1시 점심시간에 좀 시끄러워요"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
            />

            <button className="modal-save-btn" onClick={handleSubmitPin}>
              등록
            </button>
            <button
              className="modal-cancel-btn"
              onClick={() => setShowRegisterModal(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 카카오 지도 */}
      <div id="map" className="map-container"></div>

      {/* 마커 클릭 시 뜨는 상세 모달 (사진 + 태그 + 입력창) */}
      {selectedPin && (
        <PinDetailModal pin={selectedPin} onClose={() => setSelectedPin(null)} />
      )}
    </div>
  );
};

export default MapPage;
