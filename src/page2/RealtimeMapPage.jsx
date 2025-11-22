// src/pages/RealtimeMapPage.jsx
import React, { useEffect, useState, useRef } from "react";
import "../styles/mapstyle.css";
/* global kakao */

const RealtimeMapPage = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const selectedColorRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [tempLatLng, setTempLatLng] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tagText, setTagText] = useState("");

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    selectedColorRef.current = color;
    setShowMenu(false);
  };

  // ✅ 카카오 SDK가 index.html에서 로드되었다고 가정하고 사용
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("카카오맵 SDK가 로드되지 않았습니다. index.html을 확인하세요.");
      return;
    }

    window.kakao.maps.load(() => {
      initMap();
    });
  }, []);

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

    kakao.maps.event.addListener(map, "dragend", () => {
      const center = map.getCenter();
      if (!dragBounds.contain(center)) {
        map.setCenter(new kakao.maps.LatLng(37.651996, 127.016508));
      }
    });

    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
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
      setShowModal(true);
    });
  };

  const handleSubmitPin = () => {
    if (!selectedFile) {
      alert("사진을 업로드하세요.");
      return;
    }
    if (!tagText.trim()) {
      alert("의견을 입력하세요.");
      return;
    }

    // 🔸 백엔드로 보낼 준비 (현재는 주석 처리된 상태)
    const formData = new FormData();
    formData.append("color", selectedColorRef.current);
    formData.append("lat", tempLatLng.getLat());
    formData.append("lng", tempLatLng.getLng());
    formData.append("tag", tagText);
    formData.append("image", selectedFile);

    /*
    fetch("http://localhost:5000/api/pin/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => alert("등록 완료!"))
      .catch(() => alert("서버 오류"));
    */

    alert("API 전달 준비 완료 (현재는 주석처리 상태)");

    // ⭐ 지도에 핀 생성
    const imageSrc = `/${selectedColorRef.current}.png`; // public/red.png, yellow.png, green.png
    const imageSize = new kakao.maps.Size(32, 32);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    new kakao.maps.Marker({
      position: tempLatLng,
      map: window.map,
      image: markerImage,
    });

    setShowModal(false);
    setSelectedFile(null);
    setTagText("");
    setSelectedColor(null);
    selectedColorRef.current = null;
    setShowMenu(false);
  };

  return (
    <div className="map-wrapper">
      {/* 상단 핀찍기 버튼 */}
      <div className="pin-main-button" onClick={() => setShowMenu(!showMenu)}>
        핀찍기
      </div>

      {/* 색 선택 메뉴 */}
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

      {/* 사진 + 의견 입력 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>핀 정보 등록</h3>

            <label>사진 업로드</label>
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            <label>의견 / 태그 입력</label>
            <textarea
              placeholder="자세한 의견을 입력하세요."
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
            />

            <button className="modal-save-btn" onClick={handleSubmitPin}>
              등록
            </button>
            <button
              className="modal-cancel-btn"
              onClick={() => setShowModal(false)}
            >
              취소
            </button>
          </div>
        </div>
      )}

      {/* 카카오 지도 영역 */}
      <div id="map" className="map-container"></div>
      {/* BottomNav는 없으니까 제거했어. 필요하면 아래에 다시 추가 */}
    </div>
  );
};

export default RealtimeMapPage;