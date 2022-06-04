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
