const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {        
		const token = req.headers['authorization'];
		if (!token) {
			return res.status(401).json({
				code: 401,
				status: 'UNAUTHORIZED',
				error: {
					message: 'You must login first',
				},
			});
		}

		const payload = jwt.verify(token, 'secret');
		req.users = payload;
		next();
	} catch (err) {
		if (err.message == 'jwt malformed') {
			return res.status(500).json({
				code: 500,
				status: 'Internal Server Error',
				error: {
					message: err.message,
				},
			});
		}
		next(err);
	}
};
