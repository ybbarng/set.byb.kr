# Online Game SET

<p align="center">
    <img src="/preview.png" title="SET Preview" />
</p>

## 기술 스택

- Node.js 22, Express, Socket.IO 4
- jQuery 3.7, Vite, Biome, Vitest
- Docker 배포

## Docker로 실행

```sh
# 이미지 빌드
docker build -t set_app .

# 컨테이너 실행
docker run -d --name set_app --restart unless-stopped -p 127.0.0.1:8080:80 set_app
```

## Docker 없이 실행

```sh
# 의존성 설치
pnpm install

# 개발 모드 (서버 + Vite HMR)
pnpm dev

# 프로덕션 빌드 후 실행
pnpm build
pnpm start
```

## 테스트 / 린트

```sh
pnpm test
pnpm lint
```

## Changelog

### 2026.02 — 현대화 (with Claude)

Claude Code를 이용하여 약 10년 된 프로젝트의 런타임과 도구를 전면 현대화.

- Node.js 12 → 22, Socket.IO 3 → 4, jQuery 3.1 → 3.7
- Webpack + Babel → Vite, ESLint → Biome, npm → pnpm
- CommonJS → ESM 모듈 전환
- Vitest 단위 테스트 추가
- master → main 브랜치 전환

### 2020.12

- 게임 중 화면이 꺼지지 않도록 NoSleep.js 적용

### 2019.08

- Docker 배포 도입

### 2016.08 ~ 2018

- 프로젝트 시작 (socket.io-p2p 채팅 예제 기반)
- SET 게임 핵심 로직 구현 (카드 표시, 선택, SET 판정, 점수)
- 멀티플레이어 지원, 채팅, 이름 변경 기능
- 동물 이름 자동 부여, 쿠키 기반 세션 유지
- Google Analytics, 모달, 애니메이션 등 UI 개선
- browserify → gulp → webpack 빌드 도구 변천

## Resources

- Set the original boardgame: [SET | America's Favorite Card Games](http://www.setgame.com/set)
- Base code from [socket.io-p2p chat example](https://github.com/socketio/socket.io-p2p)
- Card image from [vincentwoo/setgame](https://github.com/vincentwoo/setgame)
- Animal names from [Animal Pictures Archive](http://animal.memozee.com/animal/Dic/)
