const EventEmitter = require('events');
const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

class Logger extends EventEmitter {
	log(msg) {
		// Call event
		this.emit('message', { id: uuid.v4(), msg });
	}
}

const logger = new Logger();
logger.on('message', data => fs.readFile(path.join(__dirname, 'log.txt'), 'utf8', (res, err) => {
	if (err) {
		// Log file doesn't exist yet so we create it
		fs.writeFile(path.join(__dirname, 'log.txt'), `${data.id}: ${data.msg}\n`, err => {
			if (err) throw err;
		});
	} else {
		fs.appendFile(path.join(__dirname, 'log.txt'), `${data.id}: ${data.msg}\n`, err => {
			if (err) throw err;			
		});
	}
	console.log('Message written to log...');
}));

logger.log('Hello World');
logger.log('Testing multiple messages');
logger.log('Logging another message');