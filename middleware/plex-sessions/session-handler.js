'use strict';

const request = require('axios');

const { plexServer, plexToken, reasons } = require('config');

let options = {
	method: 'get',
	headers: {
		'X-Plex-Token': plexToken
	}
};

const getSessions = async () => {
	try {
		options.url = `${ plexServer }/status/sessions`;
		const { data } = await request(options);
		return data;
	}
	catch (error) {
		return error;
	}
};

const getKillSessionId = async (user) => {
	try {
		const sessions = await getSessions();
		const sessionData = _getSessionData(sessions);
		const sessionId = _getSessionId(user, sessionData);
		_doesSessionExist(sessionId);
		return sessionId;
	}
	catch (error) {
		return error;
	}
};

const killSession = async (sessionId, reason, user) => {
	const message = reasons[ `${ reason }` ];
	options.url = `${ plexServer }/status/sessions/terminate?sessionId=${ sessionId }&reason=${ user }, ${ message }`;
	await request(options);
};

const _getSessionId = (user, sessionData) => {
	let id = [];
	sessionData.map(item => {
		if (item.title === user) {
			id.push(item.sessionId);
		}
	});
	return id;
};

const _getSessionData = ({ MediaContainer }) => {
	return MediaContainer.Metadata.map(item => ({
		uuid: item.Player.machineIdentifier,
		sessionId: item.Session.id,
		title: item.User.title
	}));
};

const _doesSessionExist = (sessionId) => {
	if (!sessionId || !sessionId.length) {
		throw Error('Session Does Not Exist');
	}
};

module.exports = {
	getSessions,
	getKillSessionId,
	killSession
};
