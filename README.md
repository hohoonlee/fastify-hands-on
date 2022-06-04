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
		> yarn add tap pino-pretty -D
	- 명령 실행후 dependency
	```
	"dependencies": {
    	"@fastify/swagger": "^6.1.0",
    	"dayjs": "^1.11.2",
    	"fastify": "^3.29.0",
   		"underscore": "^1.13.4"
  	},
  	"devDependencies": {
		"pino-pretty": "^8.0.0",
		"tap": "^16.2.0"
	}
	```

1. 앱 작성