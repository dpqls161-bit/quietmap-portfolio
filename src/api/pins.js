// src/api/pins.js

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
  return get(`${API_BASE}/api/pins`);
}

/* 특정 핀 상세 */
export async function fetchPinDetail(pinId) {
  return get(`${API_BASE}/api/pins/${pinId}`);
}

/* 특정 핀에 태그 추가 */
export async function addTagToPin(pinId, text) {
  return post(`${API_BASE}/api/pins/${pinId}/tags`, { tag: text });
}

