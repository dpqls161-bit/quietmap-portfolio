// src/api/httpClient.js
import { API_BASE_URL } from "./config";

export function buildUrl(path) {
  if (!path.startsWith("/")) path = "/" + path;
  return `${API_BASE_URL}${path}`;
}

export async function getJson(path) {
  const url = buildUrl(path);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420",  // ★ 추가
    },
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("❌ GET 요청 실패:", res.status, text);
    throw new Error(`GET failed: ${res.status}`);
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("❌ JSON 파싱 실패:", text);
    throw e;
  }
}

export async function postJson(path, bodyObj) {
  const url = buildUrl(path);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "ngrok-skip-browser-warning": "69420", // ★ 추가
    },
    body: JSON.stringify(bodyObj),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("❌ POST 요청 실패:", res.status, text);
    throw new Error(`POST failed: ${res.status}`);
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("❌ POST 응답 JSON 파싱 실패:", text);
    throw e;
  }
}
