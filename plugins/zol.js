// SN4T14 2015-09-07
// License: WTFPL
'use strict';
module.exports = function (client, from, to, message, config) {
	if (message.match(new RegExp(".*\\b" + config.nickname + ".*zfs on linux\\b.*", "gi"))) {
		client.say(to, "Here you go: http://sn4t14.com/zol/");
	} else if (message.match(new RegExp(".*\\b" + config.nickname + ".*zol\\b.*", "gi"))) {
		client.say(to, "Here you go: http://sn4t14.com/zol/");
	}
};
