# QuietMap

조용한 길을 선택하기 위한 지도 기반 웹 서비스입니다.  
사용자는 지도 위에 소음 수준 핀을 확인하고, 비교적 조용한 경로를 선택할 수 있습니다.

---

## Tech Stack
React · React Router · Context API · Firebase Auth · Kakao Map API · CSS

---

## What I Did (Frontend)

- Firebase Authentication 기반 로그인 구현
- Context API를 활용한 전역 인증 상태 관리
- React Router 기반 페이지 라우팅 구성
- 지도 범위에 따른 핀 동적 렌더링 로직 구현
- 핀 등록 모달 상태 관리 및 UI 구현
- CSS 구조 리팩토링 및 스타일 폴더 통합 정리
- 포트폴리오용 Mock 모드 분기 처리 구현

---

## Key Implementation

- 지도 이동 시 현재 범위에 해당하는 핀만 재렌더링하도록 설계
- 인증 상태에 따라 핀 등록 기능 제어
- 서버 없이 실행 가능하도록 Mock 모드 설계

---

## Run

```bash
npm install
npm start
```

Mock 모드 실행 시 `.env` 파일에:

```
REACT_APP_USE_MOCK=true
```

---

## Demo

- Demo Video: (링크 추가)
- Screenshot: (이미지 추가)
