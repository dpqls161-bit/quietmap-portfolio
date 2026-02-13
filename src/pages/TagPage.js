// src/page2/TagPage.js

import React, { useEffect, useState, useRef } from "react";
import "../styles/mapstyle.css";
import BottomNav from "../components/nav";
import PinDetailModal from "../components/PinDetailModal";
import { fetchPins } from "../api/pins";


/* global kakao */

const TagPage = () => {
  const markersRef = useRef([]);
  const [selectedPinId, setSelectedPinId] = useState(null);

  const loadPins = async () => {
  if (!window.tagMap) return;

  try {
    const pins = await fetchPins();

    // 기존 마커 제거
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // 마커 다시 생성 (기존 로직 유지)
    pins.forEach((pin) => {
      const imageSrc = process.env.PUBLIC_URL + `/${pin.level}.png`;

      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        new kakao.maps.Size(32, 32)
      );

      const marker = new kakao.maps.Marker({
        map: window.tagMap,
        position: new kakao.maps.LatLng(pin.lat, pin.lng),
        image: markerImage,
      });

      markersRef.current.push(marker);
    });
  } catch (err) {
    console.error("핀 불러오기 오류:", err);
  }
};


  useEffect(() => {
    const container = document.getElementById("tag-map");
    if (!container) return;

    const map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(37.651996, 127.016508),
      level: 3,
    });

    window.tagMap = map;

    loadPins();

    kakao.maps.event.addListener(map, "idle", () => {
      loadPins();
    });
  }, []);

  return (
    <div className="map-wrapper">
      <h2 style={{ padding: "15px", fontWeight: "bold" }}>장소 상세 태그 달기</h2>

      <div id="tag-map" className="map-container"></div>

      {selectedPinId && (
        <PinDetailModal
          pinId={selectedPinId}
          onClose={() => setSelectedPinId(null)}
        />
      )}

      <BottomNav />
    </div>
  );
};

export default TagPage;
