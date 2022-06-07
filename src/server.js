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
