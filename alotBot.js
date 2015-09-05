// SN4T14 2015-04-04
// License: WTFPL
'use strict';

var irc = require('irc');
var yaml = require('js-yaml');
var fs = require('fs');
var schedule = require('node-schedule');

var config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

var client = new irc.Client(config.server, config.nickname, {
	channels: config.channels
});

client.addListener('message', function (from, to, message) {
	console.log(from + " -> " + to + ":", message);

	if (from === config.admin && message.indexOf(config.nickname) === 0) {
		var channelIndex, channel;
		// Message from bot admin to bot
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
		if (message.match(new RegExp(".*\\balot\\b.*", "gi"))) {
			client.say(to, "Oi! " + from + '! "alot" is not a word! "a lot" is the correct term!');
		} else if (message.match(new RegExp(".*\\ballot\\b.*", "gi"))) {
			client.say(to, "Oi! " + from + '! "allot" is not the word you\'re looking for! "a lot" is the correct term!');
		} else if (message.match(new RegExp(".*\\bxbmc\\b.*", "gi")) && (!message.match(new RegExp(".*\\bkodi\\b.*", "gi")))) {
			client.say(to, "Oi! " + from + '! "XBMC" is the old name! It\'s now called "Kodi"!');
		} else if (message.match(new RegExp(".*\\bfuckers\\b.*", "gi")) && (from === "GreenObsession" || from === "tar-xvf" || from === "RonGarland")) {
			client.say(to, "Fucker");
		} else if (message.match(new RegExp(".*\\b" + config.nickname + ",.*starting point\\b.*", "gi"))) {
			client.say(to, "Here you go: http://pcpartpicker.com/p/hnbrf7");
		} else if (message.match(new RegExp(".*\\b" + config.nickname + ",.*datahoarder wiki\\b.*", "gi"))) {
			client.say(to, "Here you go: http://reddit.com/r/datahoarder/wiki");
		} else if (message.match(new RegExp(".*\\b" + config.nickname + ",.*zfs on linux\\b.*", "gi"))) {
			client.say(to, "Here you go: http://sn4t14.com/zol/");
		} else if (message.match(new RegExp(".*\\b" + config.nickname + ",.*zol\\b.*", "gi"))) {
			client.say(to, "Here you go: http://sn4t14.com/zol/");
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

var dingDongNotification = function() {
	client.say("#DataHoarder", "The ding dong days are over!");
};

var dingDongDate = new Date(2016, 3, 8, 17, 0, 0);

schedule.scheduleJob(dingDongDate, dingDongNotification);
