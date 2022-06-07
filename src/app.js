const fastify = require('fastify');

const build = (opts={}) => {
	const app = fastify(opts);

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

	app.get('/hello/:name', {
		schema: {
			description: 'Hellow Test',
			params: {
				type: 'object',
				properties: {
					name: {
						type: 'string',
						enum: ['world', 'siva6'],
						description : 'user name'
					}
				}
			},
			response: {
				'2xx': {
					type: 'object',
					properties: {
						msg: {type: 'string'}
					}
				}
			}
		}
	}, async (req, res) => {
		let name = req?.params?.name;
		res.send({ msg: `Hello,${name}`, info:'test version'});
	});

	return app;
};

module.exports = build;
