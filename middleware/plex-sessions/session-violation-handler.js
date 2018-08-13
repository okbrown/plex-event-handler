'use strict';

const { getKillSessionId, killSession } = require('./session-handler');

const sessionViolationHandler = async (err, req, res, next) => {
	if (err) {
		try {
			const { violation: { user, reason } } = err;
			const sessionId = await getKillSessionId(user);
			await _killSessions(sessionId, reason, user);
			res.status(400);
		}
		catch (error) {
			res.status(400);
		}
	}
	else {
		res.status(200);
	}
};

const _killSessions = async (sessionId, reason, user) => {
	if (sessionId.length) {
		await Promise.all(sessionId.map(id => killSession(id, reason, user)));
	}
	throw Error('Session ID Not Valid');
};

const violationMessage = ({ status, reason, user, uuid }) => {
	let error = new Error(reason);
	error.violation = { status, reason, user, uuid };
	return error;
};

module.exports = {
	sessionViolationHandler,
	violationMessage
};