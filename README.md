# ⌨️ 키보드 추천 서비스 `tadak`

- 배포 사이트 [Link](https://tadak.alex-choi.com/)

## Description

<!-- [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. -->
<p>Node Version : 22.9.0</p>
<p>NextJS Version : 15.4.1</p>
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Access to Swagger Document

- Swagger Document [Link](https://winereview-api.vercel.app/docs/#/) :
  해당 서버가 실행시 접속가능
- teamId는 16-3 사용

## Reference

- Figma 기획 변경본(tadak) [Link](https://www.figma.com/design/Pxl73BvQHgy14e9AsuPqbv/tadak--WHYNE-copy-?node-id=140-7165&t=I25vjOIk2ZbbJx5p-0)
- Figma 원본(WHYNE) [Link](https://www.figma.com/design/KKEgdM0NWLI4kSqEpdR3RB/WINE-BBB-?node-id=6-1760&p=f&t=47Iv300lVqLIDEGI-0)
- GitHub Frontend [Link](https://github.com/Alex-Choi0/codeit-intermidiate-project)
- Discord [Link](https://discord.com/channels/1344520737691668561/1385486572992073788)
- Notion [Link](https://www.notion.so/2318ca8d39728171822aeb14df352b13?pvs=13)

## 폴더 구조
```
📦public 
 ┣ 📂fonts 
 ┃ ┣ 📜Pretendard-Bold.woff 
 ┃ ┣ 📜Pretendard-Medium.woff
 ┃ ┣ 📜Pretendard-Regular.woff
 ┃ ┗ 📜Pretendard-SemiBold.woff
 ┗ 📂images
 ┃ ┣ 📜logoImg.svg
 ┃ ┣ 📜keyboard1.png
 ┃ ┣ 📜keyboard2.png
 ┃ ┣ 📜.svg
 ┃ ┗ 📜window.svg
 ┃
 📦src
 ┣ 📂app
 ┃ ┣ 📂(auth)
 ┃ ┃ ┣ 📂login
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜layout.tsx
 ┃ ┣ 📂(global)
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📜getKeyboards.ts
 ┃ ┃ ┗ 📜addKeyboard.ts
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┗ 📜layout.tsx
 ┣ 📂components
 ┃ ┣ 📂feature
 ┃ ┃ ┣ 📜LoginForm.tsx
 ┃ ┃ ┗ 📜SignUpForm.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┗ 📜Header.tsx
 ┃ ┗ 📂ui
 ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┗ 📜Modal.tsx
 ┣ 📂constants
 ┃ ┗ 📜constants.ts
 ┣ 📂hooks
 ┃ ┗ 📜useWindowDimension.ts
 ┣ 📂lib
 ┃ ┗ 📜axios.ts
 ┣ 📂types
 ┗ 📂utils
 ┃ ┣ 📜formatDate.ts
 ┃ ┗ 📜formatPrice.ts
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
