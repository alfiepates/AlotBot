// SN4T14 2015-09-07
// License: WTFPL
'use strict';
module.exports = function (client, from, to, message) {
	if (message.match(new RegExp(".*\\balot\\b.*", "gi"))) {
		client.say(to, "Oi! " + from + '! "alot" is not a word! "a lot" is the correct term!');
	}
};
