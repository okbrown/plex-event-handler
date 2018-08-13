'use strict';

const getPayload = () => {
	return (req, res, next) => {
		res.locals.payload = _parsePayload(req.body.payload);
		next();
	};
};

const _parsePayload = data => JSON.parse(data);

module.exports = getPayload;