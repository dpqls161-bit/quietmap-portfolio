# Quiet Map

## 프로젝트 소개

Quiet Map은 사용자가 도시 환경에서 ‘빠른 길’이 아닌 ‘조용한 길’을 선택할 수 있도록 설계된 위치 기반 웹 애플리케이션입니다.

기존 지도 서비스가 거리와 시간 중심으로 경로를 안내하는 것과 달리, 본 프로젝트는 장소에 대한 분위기 태그(quiet, calm, crowded 등)를 시각화하여 사용자가 혼잡한 구역을 피하고 보다 편안한 경로를 선택할 수 있도록 돕는 것을 목표로 합니다.


## 담당 역할 (Frontend)

해커톤 팀 프로젝트로 진행되었으며, 프론트엔드 개발을 담당했습니다.

- Kakao Map API 연동 및 지도 UI 구현
- 핀 생성 및 상세 모달 인터페이스 구현
- 태그 등록 및 동적 렌더링 로직 구현
- Firebase Authentication 기반 로그인 기능 구현
- React Router 기반 페이지 라우팅 구성
- REST API 연동 및 비동기 처리 구현


## 주요 기술 스택

- React
- React Router
- Context API
- Kakao Maps JavaScript SDK
- Firebase Authentication
- REST API (Axios 기반 통신)
- CSS 기반 모듈화 스타일 관리


## 기술적 구현 포인트

- 지도 현재 영역(bounds)을 기준으로 핀 데이터를 요청하여 렌더링
- 사용자 입력 → 상태 업데이트 → 서버 반영의 비동기 흐름 설계
- 인증 상태를 Context API로 전역 관리하여 페이지 간 일관성 유지
- 해커톤 이후 폴더 구조 통합 및 CSS 정리 리팩토링 진행


## 향후 개선 방향

- 태그 기반 경로 필터링 기능 고도화
- 혼잡도 히트맵 시각화 기능 추가
- 사용자 맞춤형 경로 추천 로직 구현
