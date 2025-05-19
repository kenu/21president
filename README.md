# 제21대 대통령선거 정보 웹사이트

대한민국 제21대 대통령선거 등록 현황 정보를 제공하는 웹사이트입니다.

## 기능

- 선거 ID와 선거 유형에 따른 후보자 등록 현황 조회
- 후보자 정보 (이름, 정당, 선거구, 등록상태, 등록일자) 표시
- 반응형 디자인으로 모바일 환경 지원

## 기술 스택

- Node.js
- Express
- EJS (템플릿 엔진)
- pnpm (패키지 관리자)
- Bootstrap 5 (UI 프레임워크)
- 공공데이터포털 API

## 설치 및 실행 방법

### 1. 저장소 클론

```bash
git clone <repository-url>
cd 21president
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 서버 실행

```bash
pnpm start
```

또는 개발 모드로 실행 (자동 재시작):

```bash
pnpm dev
```

### 4. 웹사이트 접속

브라우저에서 http://localhost:8000 으로 접속하세요.

## API 정보

이 웹사이트는 공공데이터포털에서 제공하는 선거관리위원회 API를 사용합니다:
- API 엔드포인트: https://apis.data.go.kr/9760000/PofelcddInfoInqireService/getPofelcddRegistSttusInfoInqire

## 라이센스

MIT
