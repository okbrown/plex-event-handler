'use strict';

const { violationMessage } = require('../plex-sessions/session-violation-handler');

const mediaEventHandler = () => {
	return (req, res, next) => {
		const { event } = res.locals.payload;
		const { Account: { title }, Player: { uuid } } = res.locals.payload;
		if (event === 'media.pause') {
			// console.log('pause');
			const error = violationMessage({ status: true, reason: 'noPausing', user: title, uuid });
			next(error);
		}
		if (event === 'media.play') {
			// console.log('play');
			next();
		}
		if (event === 'media.resume') {
			// console.log('resume');
			next();
		}
		if (event === 'media.stop') {
			// console.log('stop');
			next();
		}
		if (event === 'media.scrobble') {
			// console.log('scrobble');
			next();
		}
		if (event === 'media.rate') {
			// console.log('rate');
			next();
		}
		else {
			next();
		}
	};
};

module.exports = {
	mediaEventHandler
};