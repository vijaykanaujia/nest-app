const allowedOrigins = ['http://localhost:3000'];

export const corsOptions = {
	origin: (origin, callback) => {
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	allowedHeaders:
		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
	methods: 'PUT,POST,DELETE,UPDATE,OPTIONS',
	credentials: true,
};
