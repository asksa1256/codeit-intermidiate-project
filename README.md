# ⌨️ 키보드 리뷰 커뮤니티 `Tadak(타닥)`

사용자 리뷰를 중심으로 키보드 정보를 공유하고,<br/> 
멀티 필터로 맞춤형 키보드를 탐색할 수 있는 `커뮤니티형 웹 애플리케이션`입니다.

## 주요 기능
- 키보드 목록·리뷰 조회 및 상세 필터
- Next.js API Routes를 활용한 쿠키 기반 인증 구현
- 키보드 등록/수정/삭제 (회원 기능)
- 키보드 리뷰 등록/수정/삭제 (회원 기능)
- 외부 CDN 기반(wsrv.nl) 이미지 프록시 적용 → Vercel Next.js Image Optimization 한도 초과 방지

## 배포 링크

[https://tadak-163.vercel.app](https://tadak-163.vercel.app/)

## 📸 데모

| CRUD                                                                                         | 무한 스크롤                                                                                   |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| <img src='https://github.com/user-attachments/assets/6fa95589-6b36-4f58-8c9a-545c0a3faa51'/> | <img src='https://github.com/user-attachments/assets/2dfe8ce8-7bab-4a6a-89de-661c8b58f21f'/> |

| 인증 시스템                                                                                  | 멀티 필터                                                                                       |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| <img src='https://github.com/user-attachments/assets/00b176d3-61d3-4d6b-b434-e50a47fa802e'/> | <img src='https://github.com/user-attachments/assets/541edea9-5dab-405e-982e-4ae1e5b9b60c'/> |

## R&R

| 이름   | 역할                                                                                 |
| ------ | ------------------------------------------------------------------------------------ |
| 김인   | 키보드 목록 페이지, 멀티 필터, 모달                                                             |
| 윤정환 | 키보드 상세 페이지, 랜딩 페이지, 필터 범위 슬라이더, 별점 버튼, 무한 스크롤              |
| 이상달 | 인증 시스템, 키보드 등록/수정 폼, 키보드 추천 목록, 인풋, 버튼, 토스트               |
| 이태경 | 내 프로필 페이지, 리뷰 등록/수정 폼, 키보드 목록 페이지 퍼블리싱, 멀티 필터, 드롭다운, 라디오 아이템 |
| 최재호 | 헤더, 배포                                                                           |

## 기술 스택

<img src='https://img.shields.io/badge/Next.js-15.4-white?labelColor=black' /> <img src='https://img.shields.io/badge/Node.js-22-white?labelColor=5FA04E' /> <img src='https://img.shields.io/badge/TypeScript-5-white?labelColor=3178C6' /> <img src='https://img.shields.io/badge/TailwindCSS-4-white?labelColor=06B6D4' />
<img src='https://img.shields.io/badge/clsx-2-white?labelColor=gray'/> <img src='https://img.shields.io/badge/tailwindMerge-3.3-white?labelColor=gray' /> <img src='https://img.shields.io/badge/HeadlessUI-2.2-white?labelColor=66E3FF'/> <img src='https://img.shields.io/badge/React%20Hook%20Form-7.6-white?labelColor=EC5990' /> <img src='https://img.shields.io/badge/Zustand-5-white?labelColor=9C4121' />
<img src='https://img.shields.io/badge/axios-1.10-white?labelColor=5A29E4' /> <img src='https://img.shields.io/badge/Swiper-11-white?labelColor=6332F6' /> <img src='https://img.shields.io/badge/Framer%20Motion-12-white?labelColor=0055FF'/>

## 레퍼런스 
- [Swagger Document](https://winereview-api.vercel.app/docs) (teamId: `16-3`)
- [Figma 기획 수정(tadak)](https://www.figma.com/design/Pxl73BvQHgy14e9AsuPqbv/tadak--WHYNE-copy-?node-id=140-7165&t=I25vjOIk2ZbbJx5p-0)
- [Figma 원본(WHYNE)](https://www.figma.com/design/KKEgdM0NWLI4kSqEpdR3RB/WINE-BBB-?node-id=6-1760&p=f&t=47Iv300lVqLIDEGI-0)

## 커뮤니케이션 
- [Discord](https://discord.com/channels/1344520737691668561/1385486572992073788)
  - 실시간 소통, Webhook & GitHub 연동 실시간 PR 알림 
- [Notion](https://www.notion.so/2318ca8d39728171822aeb14df352b13?pvs=13)
  - 개발 문서 공유, 일정 관리 

## 폴더 구조

```
📦public             # 정적 리소스 (폰트, 이미지)
 ┣ 📂fonts
 ┗ 📂images
📦src
 ┣ 📂app
 ┃ ┣ 📂(auth)        # 인증 관련 라우팅 그룹
 ┃ ┃ ┣ 📂oauth
 ┃ ┃ ┣ 📂signIn
 ┃ ┃ ┣ 📂signUp
 ┃ ┗ 📂(global)      # 일반 라우팅 그룹
 ┃   ┣ 📂keyboards
 ┃   ┣ 📂myprofile
 ┣ 📂components
 ┃ ┣ 📂feature       # 도메인 단위 컴포넌트 (페이지/기능 중심)
 ┃ ┣ 📂layout        # layout.tsx
 ┃ ┗ 📂ui            # 공용 컴포넌트
 ┣ 📂constants       # 상수 관리
 ┣ 📂hooks           # 커스텀 훅
 ┣ 📂lib
 ┃ ┗ 📂api           # API 클라이언트, 인증 관련 로직
 ┣ 📂stores          # 전역 상태 관리 (Zustand)
 ┣ 📂types           # 타입 정의
 ┗ 📂utils           # 공용 유틸 함수
```

## 시작하기

개발 서버 실행:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

