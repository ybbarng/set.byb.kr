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

## Resources

- Set the original boardgame: [SET | America's Favorite Card Games](http://www.setgame.com/set)
- Base code from [socket.io-p2p chat example](https://github.com/socketio/socket.io-p2p)
- Card image from [vincentwoo/setgame](https://github.com/vincentwoo/setgame)
- Animal names from [Animal Pictures Archive](http://animal.memozee.com/animal/Dic/)
