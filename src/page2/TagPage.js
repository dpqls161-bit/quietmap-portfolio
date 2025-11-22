// src/page2/TagPage.js

import React, { useEffect, useState, useRef } from "react";
import "../css/mapstyle.css";
import BottomNav from "../components/nav";
import PinDetailModal from "../compo2/PinDetailModal";

const API_BASE = "https://preaortic-paratactically-marti.ngrok-free.dev";
/* global kakao */

const TagPage = () => {
  const markersRef = useRef([]);
  const [selectedPinId, setSelectedPinId] = useState(null);

  const loadPins = () => {
    if (!window.tagMap) return;

    const bounds = window.tagMap.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    const params = new URLSearchParams({
      min_lat: sw.getLat(),
      max_lat: ne.getLat(),
      min_lng: sw.getLng(),
      max_lng: ne.getLng(),
    });

    fetch(`${API_BASE}/api/pins/?${params.toString()}`, {
      headers: { "ngrok-skip-browser-warning": "69420" },
    })
      .then((res) => res.json())
      .then((pins) => {
        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = [];

        pins.forEach((pin) => {
          // pin.level already = red/yellow/green
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

          kakao.maps.event.addListener(marker, "click", () => {
            setSelectedPinId(pin.id);
          });

          markersRef.current.push(marker);
        });
      });
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
