'use strict';

const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { hostname, port, userWhiteList } = require('config');
const getPayload = require('./middleware/plex-events/get-payload');
const isUserOnWhiteList = require('./middleware/plex-users/white-list');
const { mediaEventHandler } = require('./middleware/plex-events/media-event-handler');
const { isUserSessionsX } = require('./middleware/plex-sessions/x-user-handler');
const { sessionViolationHandler } = require('./middleware/plex-sessions/session-violation-handler');
const endChain = require('./middleware/helpers/end-chain');

app.post('/webhook',
	upload.single('thumb'),
	getPayload(),
	isUserOnWhiteList(userWhiteList),
	mediaEventHandler(),
	isUserSessionsX(),
	endChain()
);

app.use(sessionViolationHandler);

app.listen(port, () => {
	console.log(`API is running on ${ hostname }:${ port }`);
});