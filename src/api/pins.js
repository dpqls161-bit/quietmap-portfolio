// src/api/pins.js
import { mockPins, mockPinDetail } from "../mock/pins.mock";

const USE_MOCK = process.env.REACT_APP_USE_MOCK === "true";

const API_BASE = "https://preaortic-paratactically-marti.ngrok-free.dev";

/* JSON GET */
async function get(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  });
  return res.json();
}

/* JSON POST */
async function post(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "69420",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

/* 핀 전체 목록 */
export async function fetchPins() {

  // ✅ Mock 모드일 때 더미 데이터 반환
  if (process.env.REACT_APP_USE_MOCK === "true") {
    console.log("📦 Mock 모드: 더미 핀 데이터 사용");

    return [
      {
        id: 1,
        lat: 37.651996,
        lng: 127.016508,
        level: "quiet",
      },
      {
        id: 2,
        lat: 37.6523,
        lng: 127.0172,
        level: "normal",
      },
      {
        id: 3,
        lat: 37.6512,
        lng: 127.0159,
        level: "loud",
      },
    ];
  }

  // ✅ 실제 서버 호출
  return get(`${API_BASE}/api/pins`);
}


/* 특정 핀 상세 */
export async function fetchPinDetail(pinId) {
  if (USE_MOCK) return mockPinDetail(pinId);
  return get(`${API_BASE}/api/pins/${pinId}`);
}

/* 특정 핀에 태그 추가 */
export async function addTagToPin(pinId, text) {
  if (USE_MOCK) {
    // mock에선 "추가된 것처럼" 응답만 흉내 (서버 저장 X)
    return { ok: true };
  }
  return post(`${API_BASE}/api/pins/${pinId}/tags`, { tag: text });
}
