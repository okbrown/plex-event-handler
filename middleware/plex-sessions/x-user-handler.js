'use strict';

const { getSessions } = require('./session-handler');
const { violationMessage } = require('./session-violation-handler');

const isUserSessionsX = () => {
  return async (req, res, next) => {
    const { Account: { title }, Player: { uuid } } = res.locals.payload;
    try {
      const sessions = await getSessions();
      const users = _getUserSession(sessions, title);
      const violation = _hasUserViolatedMultipleSessions(users);

      if (violation) {
        const error = violationMessage({ status: true, reason: 'duplicateUser', user: title, uuid });
        next(error);
      }
      else {
        next();
      }
    }
    catch (error) {
      res.status(400);
    }
  };
};

const _getUserSession = (sessions, user) => {
  const { MediaContainer: { size, Metadata, Video } } = sessions;
  const data = Metadata || Video;
  if (size > 1) {
    return data
      .map(item => _getUser(item, user))
      .filter(Boolean);
  }
  return false;
};

const _getUser = (item, user) => {
  if (item.User.title === user) {
    return item.User.title;
  }
};

const _hasUserViolatedMultipleSessions = users => users && users.length > 1;

module.exports = {
  isUserSessionsX
};