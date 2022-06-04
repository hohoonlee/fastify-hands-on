fastify-hands-on
========================
1. 사전 설치
	- nodejs (가능하면 LTS)
	- yarn

1. project 초기화
	- 아래 명령을 수행하면 기본적인 정보로 package.json이 생성됩니다.
		> yarn init -y
	- 기본 패키지 추가
		> yarn add fastify @fastify/swagger underscore dayjs
	- 기본 개발 패키지 추가 (TEST)
		> yarn add tap pino-pretty nodemon -D
	- 명령 실행후 dependency
	```
	"dependencies": {
    	"@fastify/swagger": "^6.1.0",
    	"dayjs": "^1.11.2",
    	"fastify": "^3.29.0",
   		"underscore": "^1.13.4"
  	},
  	"devDependencies": {
		"nodemon": "^2.0.16",
		"pino-pretty": "^8.0.0",
		"tap": "^16.2.0"
	}
	```

1. 앱 작성
	- 작업 디렉토리 생성
		> mkdir src && mkdir test
	- src/app.js를 생성한다.
		```
		const fastify = require('fastify');

		const build = (opts={}) => {
			const app = fastify(opts);

			app.register(require('@fastify/swagger'), {});

			app.get('/hello/:name', async (req, res) => {
				let name = req?.params?.name;
				res.send({ msg: `Hello,${name}`});
			});

			return app;
		};

		module.exports = build;
		```
	- src/server.js를 생성한다.
		```
		const app = require('./app');

		const server = app({
			logger: {
				level: 'info',
				prettyPrint: true
			}
		});

		const start = async() => {
			try {
				const port = process.env.PORT || 3300;
				await server.listen(port, '0.0.0.0');
				server.swagger();
				server.log.info(`Server Start on ${server.server.address().port}`);
			}catch(e){
				server.log.error(e);
				process.exit(1);
			}
		};

		start();
		```
	- package.json에서 start script를 수정한다.
		```
		"scripts": {
			"test": "tap",
			"dev": "nodemon --watch src/ src/server.js"
		},
		```
	- server를 구동한다.
		> yarn dev
	- 127.0.0.1:3300/hello/world 로 접속해본다.
		> open http://127.0.0.1:3300/hello/world