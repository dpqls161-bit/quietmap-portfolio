# QuietMap

지도 기반 사용자 참여형 소음 데이터 시각화 서비스입니다.  
사용자가 특정 위치에 핀을 등록하고 태그를 남기면, 해당 구역의 소음 특성이 시각적으로 표현됩니다.  
단순히 기록을 남기는 지도가 아니라, 사용자 참여 데이터를 기반으로 상대적으로 “조용한 경로”를 선택할 수 있도록 설계된 서비스입니다.

---

## 1. 프로젝트 개요

- 카카오 지도 API 기반 인터랙티브 웹 애플리케이션
- 사용자 위치 기반 핀 등록 및 태그 작성 기능
- 지도 범위 내 핀 동적 렌더링
- 평균 소음 점수 시각화
- Firebase Authentication 기반 로그인 기능 구현
- Mock 모드 지원 (백엔드 서버 없이 실행 가능)

---

## 2. 담당 역할 (Frontend)

- Firebase Authentication 로그인/인증 흐름 구현
- 지도 범위 기반 핀 동적 렌더링 로직 구현
- 핀 등록 모달 UI 및 상태 관리 로직 구현
- React Router 기반 페이지 라우팅 구성
- Context API 기반 인증 상태 전역 관리
- CSS 구조 리팩토링 및 스타일 모듈화 정리
- API 호출 구조 정리 및 Mock 모드 분기 처리 구현

---

## 3. 기술 스택

- React
- React Router
- Context API
- Kakao Map API
- Firebase Authentication
- Fetch API
- CSS 기반 스타일 구조 관리

---

## 4. 주요 구현 포인트

### 1) 지도 범위 기반 동적 렌더링
- 현재 지도 bounds를 기준으로 핀 데이터 로드
- idle 이벤트 기반 재렌더링
- 기존 마커 제거 후 재생성 로직 구현

### 2) 상태 관리 구조
- 인증 상태 전역 관리 (Context API)
- 지도 UI 상태 분리 관리 (useState / useRef)

### 3) Mock 모드 지원
- 환경 변수 기반 서버 요청 분기 처리
- 서버 없이 실행 가능한 포트폴리오 전용 실행 모드 구성

---

## 5. 실행 방법

```bash
npm install
npm start
```

Mock 모드 실행 (.env)

```env
REACT_APP_USE_MOCK=true
```

---

## 6. 데모

### 스크린샷
- `/docs/screenshot-map.png`
- `/docs/screenshot-pin.png`

### 데모 영상
- YouTube: (영상 링크 삽입)
- 또는 `/docs/demo.mp4`

---

## 7. 프로젝트 의의

QuietMap은 단순한 위치 기록 서비스가 아니라,  
사용자 참여 데이터를 기반으로 공간의 “소음 맥락”을 시각화하여  
사용자가 더 조용한 경로를 선택할 수 있도록 설계된 서비스입니다.
