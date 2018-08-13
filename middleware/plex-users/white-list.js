'use strict';

const writeLog = require('../plex-logging');

const isUserOnWhiteList = (userWhiteList) => {
  return (req, res, next) => {
    const user = res.locals.payload.Account.title;
    const { event, Metadata } = res.locals.payload;
    writeLog(event, user, Metadata);
    let allowed = userWhiteList.some(u => u === user);
    if (allowed) {
      res.status(200);
    }
    else {
      next();
    }
  }
};

module.exports = isUserOnWhiteList;