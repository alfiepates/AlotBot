// SN4T14 2015-04-04
// License: WTFPL
'use strict';

var irc = require('irc');
var yaml = require('js-yaml');
var fs = require('fs');

var config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

var client = new irc.Client(config.server, config.nickname, {
	channels: config.channels
});

client.addListener('message', function (from, to, message) {
	console.log(from + " -> " + to + ":", message);

	if (from === config.admin && message.indexOf(config.nickname) === 0) {
		var channelIndex, channel;
		// Private message from bot admin to bot
		if (message.toLowerCase().indexOf("please join") > -1) {
			channelIndex = message.toLowerCase().indexOf("please join") + 12;
			channel = message.substring(channelIndex).split(" ")[0];

			client.join(channel);
		} else if (message.toLowerCase().indexOf("please leave") > -1) {
			channelIndex = message.toLowerCase().indexOf("please leave") + 13;
			channel = message.substring(channelIndex).split(" ")[0];

			client.part(channel);
		} else if (message.toLowerCase().indexOf("die") > -1) {
			process.exit();
		}
	}

	if (to !== config.nickname) {
		// Message to channel
		if (message.toLowerCase().match(/.*\balot\b.*/gi)) {
			client.say(to, "Oi! " + from + '! "alot" is not a word! "a lot" is the correct term!');
		} else if (message.toLowerCase().match(/.*\ballot\b.*/gi)) {
			client.say(to, "Oi! " + from + '! "allot" is not the word you\'re looking for! "a lot" is the correct term!');
		} else if (message.toLowerCase().match(/.*\bxbmc\b.*/gi) && (!message.toLowerCase().match(/.*\bkodi\b.*/gi))) {
			client.say(to, "Oi! " + from + '! "XBMC" is the old name! It\'s now called "Kodi"!');
		} else if (message.toLowerCase().match(/.*\bfuckers\b.*/gi) && (from === "GreenObsession" || from === "tar-xvf" || from === "RonGarland")) {
			client.say(to, "Fucker");
		} else if (message.toLowerCase().match(/.*\balotbot,.*starting point\b.*/gi)) {
			client.say(to, "Here you go: http://pcpartpicker.com/p/hnbrf7");
		}
	} else {
		// Private message to bot
	}
});

client.addListener('error', function(message) {
	console.log('error: ', message);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
	var destination = text.split(" ")[0];
	var message = text.split(" ").slice(1).join(" ");
	client.say(destination, message);
	if (text === 'quit\n') {
		process.exit();
	}
});
