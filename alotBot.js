// SN4T14 2015-04-04
// License: WTFPL
'use strict';

var irc = require('irc');
var yaml = require('js-yaml');
var fs = require('fs');
var schedule = require('node-schedule');

var config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));

var plugins = {};

fs.readdir("./plugins/", function (err, files) {
	files.forEach(function (file) {
		loadPlugin(file);
	});
});

var client = new irc.Client(config.server, config.nickname, {
	channels: config.channels
});

var loadPlugin = function (filename) {
	try {
		plugins[filename] = require("./plugins/" + filename);
	} catch (e) {
		client.say('Something broke while loading the "' + filename + '" plugin: ' + e.toString());
	}
};

client.addListener('message', function (from, to, message) {
	console.log(from + " -> " + to + ":", message);

	var loadRegexResult = new RegExp(".*\\b" + config.nickname + ".*please (re)?load ([^ ]+).*", "gi").exec(message);

	if (loadRegexResult !== null && from === config.admin && message.indexOf(config.nickname) === 0) {
		loadPlugin(loadRegexResult[2]);
	} else {
		for (var plugin in plugins) {
			// God damn it JS, implement .forEach for objects!
			plugin = plugins[plugin];
			plugin(client, from, to, message, config);
		};
	}
});

client.addListener('error', function (message) {
	console.log('error: ', message);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
	if (text === 'quit\n') {
		process.exit();
	}
	var destination = text.split(" ")[0];
	var message = text.split(" ").slice(1).join(" ");
	client.say(destination, message);
});

var dingDongNotification = function() {
	client.say("#DataHoarder", "The ding dong days are over!");
};

var dingDongDate = new Date(2016, 3, 8, 17, 0, 0);

schedule.scheduleJob(dingDongDate, dingDongNotification);
