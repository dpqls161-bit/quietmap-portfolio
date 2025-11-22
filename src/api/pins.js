// src/api/pins.js

import { getJson, postJson } from "./httpClient";

/** 핀 전체 목록 */
export async function fetchPins() {
  return getJson("/api/pins");
}

/** 특정 핀 상세 */
export async function fetchPinDetail(pinId) {
  // ✅ 백틱 사용 (잘했습니다!)
  return getJson(`/api/pins/${pinId}`); 
}

/** 특정 핀에 태그 추가 */
export async function addTagToPin(pinId, text) {
  // ❌ (X) 이렇게 보내면 백엔드가 못 알아들음
  // return postJson(`/api/pins/${pinId}/tags`, { text });

  // ✅ (O) 백엔드가 기다리는 'tag' 이름표를 붙여줘야 함!
  return postJson(`/api/pins/${pinId}/tags`, { tag: text });
}