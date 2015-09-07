// SN4T14 2015-09-07
// License: WTFPL
'use strict';
module.exports = function (client, from, to, message) {
	if (message.match(new RegExp(".*\\bxbmc\\b.*", "gi")) && (!message.match(new RegExp(".*\\bkodi\\b.*", "gi")))) {
		client.say(to, "Oi! " + from + '! "XBMC" is the old name! It\'s now called "Kodi"!');
	}
};
