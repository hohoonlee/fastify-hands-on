const t = require('tap');
const build = require('../src/app');

t.test('/ test', async t => {
	const app =  build();

	const response = await app.inject({
		method: 'GET',
		url: '/hello/world'
	});

	t.equal(response.statusCode, 200);

	const body = JSON.parse(response.body);
	t.same(body.msg, 'Hello,world');
});
