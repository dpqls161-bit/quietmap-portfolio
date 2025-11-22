import React, { useEffect, useState, useRef } from "react";
import "../css/mapstyle.css";
import BottomNav from "../components/nav";
import { auth } from "../firebase";

const API_BASE = "https://preaortic-paratactically-marti.ngrok-free.dev";

/*global kakao*/

const MapPage = () => {
  const markersRef = useRef([]);
  const [routeScore, setRouteScore] = useState(null);

  const [selectedColor, setSelectedColor] = useState(null);
  const selectedColorRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [tempLatLng, setTempLatLng] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tagText, setTagText] = useState("");

  // ----------------------------------
  // 색상 선택
  // ----------------------------------
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    selectedColorRef.current = color;
    setShowMenu(false);
  };

  
const fetchRouteScore = async () => {
  if (!window.map) return;

  const center = window.map.getCenter();
  const lat = center.getLat();
  const lng = center.getLng();

  const offset = 0.0005; // 🔥 범위 좁히기

  try {
    const res = await fetch(`${API_BASE}/api/route/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        min_lat: lat - offset,
        max_lat: lat + offset,
        min_lng: lng - offset,
        max_lng: lng + offset,
      }),
    });

    const data = await res.json();
    console.log("경로 소음 점수:", data);

    setRouteScore(data);
  } catch (err) {
    console.error("점수 조회 오류:", err);
  }
};


  // ----------------------------------
  // 핀 로딩
  // ----------------------------------
  const loadPins = () => {
    if (!window.map) return;

    const bounds = window.map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const params = new URLSearchParams({
      min_lat: sw.getLat(),
      max_lat: ne.getLat(),
      min_lng: sw.getLng(),
      max_lng: ne.getLng(),
    });

    fetch(`${API_BASE}/api/pins/?${params.toString()}`)
      .then((res) => res.json())
      .then((pins) => {
        console.log("불러온 핀:", pins);

        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = [];

        const colorMap = {
          loud: "red",
          normal: "yellow",
          quiet: "green",
        };

        pins.forEach((pin) => {
          const imageSrc = `/${colorMap[pin.level]}.png`;
          const markerImage = new kakao.maps.MarkerImage(
            imageSrc,
            new kakao.maps.Size(32, 32)
          );

          const marker = new kakao.maps.Marker({
            map: window.map,
            position: new kakao.maps.LatLng(pin.lat, pin.lng),
            image: markerImage,
          });

          markersRef.current.push(marker);
        });
      })
      .catch((err) => console.error("핀 불러오기 오류:", err));
  };

  // ----------------------------------
  // 지도 초기화
  // ----------------------------------
  useEffect(() => {
    const container = document.getElementById("map");
    if (!container) return;

    const map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(37.651996, 127.016508),
      level: 3,
    });
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

    kakao.maps.event.addListener(map, "click", (mouseEvent) => {
      const latlng = mouseEvent.latLng;

      if (!pinBounds.contain(latlng)) {
        alert("캠퍼스 밖은 불가능합니다.");
        return;
      }

      const color = selectedColorRef.current;
      if (!color) {
        alert("핀 색상을 먼저 선택하세요!");
        return;
      }

      setTempLatLng(latlng);
      setShowModal(true);
    });

    // 첫 로딩
    loadPins();
    fetchRouteScore();

    // 지도 이동 시
    kakao.maps.event.addListener(map, "idle", () => {
      loadPins();
      fetchRouteScore();
    });
  }, []);

  // ----------------------------------
  // 대표 마커 업데이트 (지도 중심)
  // ----------------------------------
  useEffect(() => {
    if (!window.map || !routeScore) return;

    // 핀 없으면 제거
    if (routeScore.pin_count === 0) {
      if (window.routeMarker) {
        window.routeMarker.setMap(null);
        window.routeMarker = null;
      }
      return;
    }

    let levelColor = "green";
    if (routeScore.average_score >= 4) levelColor = "red";
    else if (routeScore.average_score >= 2) levelColor = "yellow";

    const markerImage = new kakao.maps.MarkerImage(
      `/${levelColor}.png`,
      new kakao.maps.Size(40, 40)
    );

    if (window.routeMarker) {
      window.routeMarker.setMap(null);
    }

    window.routeMarker = new kakao.maps.Marker({
      map: window.map,
      position: window.map.getCenter(),
      image: markerImage,
    });
  }, [routeScore]);

  // ----------------------------------
  // 핀 등록
  // ----------------------------------
  const handleSubmitPin = () => {
    if (!selectedFile) return alert("사진을 업로드하세요.");
    if (!tagText.trim()) return alert("의견을 입력하세요.");
    if (!auth.currentUser) return alert("로그인이 필요합니다!");

    const levelMap = { red: "loud", yellow: "normal", green: "quiet" };

    const formData = new FormData();
    formData.append("latitude", tempLatLng.getLat());
    formData.append("longitude", tempLatLng.getLng());
    formData.append("level", levelMap[selectedColorRef.current]);
    formData.append("tags", tagText);
    formData.append("photo", selectedFile);
    formData.append("user_email", auth.currentUser.email);

    fetch(`${API_BASE}/api/pins/create`, {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          alert("서버 오류: " + JSON.stringify(data));
          return;
        }

        alert("등록 완료!");
        loadPins();
        fetchRouteScore();
      })
      .catch((err) => console.error("핀 등록 오류:", err));

    setShowModal(false);
    setSelectedFile(null);
    setTagText("");
    setSelectedColor(null);
    selectedColorRef.current = null;
    setShowMenu(false);
  };

  // ----------------------------------
  // JSX
  // ----------------------------------
  return (
    <div className="map-wrapper">

      {routeScore && (
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "10px 15px",
            borderRadius: "8px",
            zIndex: 999,
          }}
        >
          평균 소음 점수: {routeScore.average_score} <br />
          주변 핀 개수: {routeScore.pin_count}
        </div>
      )}

      <div className="pin-main-button" onClick={() => setShowMenu(!showMenu)}>
        핀찍기
      </div>

      {showMenu && (
        <div className="pin-color-menu">
          <div className="pin-color red" onClick={() => handleColorSelect("red")} />
          <div className="pin-color yellow" onClick={() => handleColorSelect("yellow")} />
          <div className="pin-color green" onClick={() => handleColorSelect("green")} />
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>핀 정보 등록</h3>

            <label>사진 업로드</label>
            <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />

            <label>의견 / 태그 입력</label>
            <textarea
              placeholder="자세한 의견을 입력하세요."
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
            />

            <button className="modal-save-btn" onClick={handleSubmitPin}>
              등록
            </button>
            <button className="modal-cancel-btn" onClick={() => setShowModal(false)}>
              취소
            </button>
          </div>
        </div>
      )}

      <div id="map" className="map-container"></div>
      <BottomNav />
    </div>
  );
};

export default MapPage;  