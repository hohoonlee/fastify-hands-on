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
