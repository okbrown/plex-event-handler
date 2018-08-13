const fs = require('fs');

const logEvents = fs.createWriteStream('plex-log.txt', { flags: 'a' });

const writeLog = (event, user, { grandparentTitle, title }) =>
	logEvents.write(`
    date: ${ new Date() }, 
    event: ${ event }, 
    user: ${ user }, 
    playing: ${ grandparentTitle || title } \n`);

module.exports = writeLog;