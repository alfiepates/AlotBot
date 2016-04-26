// SN4T14 2015-09-07
// License: WTFPL
'use strict';
module.exports = function (client, from, to, message, config) {
	if (message.match(new RegExp(".*\\b" + config.nickname + ".*starting point\\b.*", "gi"))) {
		client.say(to, "Here you go: http://pcpartpicker.com/p/cjwwdC");
	}
};
