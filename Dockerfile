FROM node:22.9.0-alpine

# Install tzdata package
RUN apk add --no-cache tzdata

ENV TZ="Asia/Seoul"

# Docker Container안의 디렉토리를 설정합니다. 설정을 안할시 Root리렉토리로 설정됩니다.
WORKDIR /frontend

# package.json을 도커 이미지에 복사합니다.
COPY package.json /frontend

COPY package-lock.json /frontend

RUN npm install

# 환경 변수 파일 복사 (중요)
COPY .env.local /frontend
COPY .env

# 해당 디렉토리에 있는 모든 파일, 폴더를 도커 이미지로 복사합니다.
# .dockerignore에 있는것은 제외
COPY . /frontend

# 해당 도커 이미지에서 build를 해서 dist폴더를 생성합니다.
RUN npm run build

# 해당 이미지의 포트를 EXPOSE합니다.
# 표시만 할뿐 실제 도커 컨테이너의 포트가 노출되지 않는다.
EXPOSE 3000

# 도커 이미지를 이용하여 컨테이너를 생성시 nodejs 자동 실행
CMD ["npm","run","start"]
