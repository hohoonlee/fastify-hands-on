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
	```json
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
		```js
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
		```js
		const app = require('./app');

		const fastify = app({
			logger: {
				level: 'info',
				prettyPrint: true
			}
		});

		const start = async() => {
			try {
				const port = process.env.PORT || 3300;
				await fastify.listen(port, '0.0.0.0');
				fastify?.swagger();
				fastify.log.info(`Server Start on ${fastify.server.address().port}`);
			}catch(e){
				fastify.log.error(e);
				process.exit(1);
			}
		};

		start();
		```
	- package.json에서 start script를 수정한다.
		```json
		"scripts": {
			"test": "tap --reporter=list --watch",
			"dev": "nodemon --watch src/ src/server.js"
		},
		```
	- server를 구동한다.
		> yarn dev
	- 127.0.0.1:3300/hello/world 로 접속해본다.
		> open http://127.0.0.1:3300/hello/world

1. 테스트 작성
	- test/app.test.js 작성
		```js
		const t = require('tap');
		const build = require('../src/app');

		t.test('/ test', async t => {
			const app =  build();

			const response = await app.inject({
				method: 'GET',
				url: '/hello/test'
			});

			t.equal(response.statusCode, 200);

			const body = JSON.parse(response.body);
			t.same(body.msg, 'Hello,test');
		});
		```
	- test 실행
		> yarn test

1. 문서 작성 (swagger)
	- src/app.js에 swagger 기본 설정 추가
	```js
	app.register(require('@fastify/swagger'), {
		routePrefix: '/documentation',
		swagger: {
			info: {
				title: 'Fastify Hands On'
		  	},
		  	host: 'localhost:3300',
		  	schemes: ['http'],
		  	consumes: ['application/json'],
		  	produces: ['application/json']
		},
		exposeRoute: true
	});
	```
	- 적용 여부 확인
	> open localhost:3300/documentation
	- schema 적용 (src/app.js 수정)
	```js
	app.get('/hello/:name', {
		schema: {
			description: 'Hellow Test',
			params: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						description : 'user name'
					}
				}
			}
		}
	}, async (req, res) => {
	```
	- 재확인
1. response 추가해 보기
	- src/app.js schema 수정
	```js
	response: {
		'2xx': {
			type: 'object',
			properties: {
				msg: {type: 'string'}
			}
		}
	}
	...
	res.send({ msg: `Hello,${name}`, info:'test version'});
	```

1. parameter 제한해 보기
	- src/app.js enum 추가
	```js
	name: {
		type: 'string',
		enum: ['world', 'siva6'],
		description : 'user name'
	}
	```
	- curl로 테스트 해보기
	```
	curl -X 'GET' \
	'http://localhost:3300/hello/xworld' \
	-H 'accept: application/json'

	{"statusCode":400,"error":"Bad Request","message":"params.name should be equal to one of the allowed values"}
	```

1. test case 수정으로 통과율 변경
