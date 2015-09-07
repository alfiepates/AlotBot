// SN4T14 2015-09-07
// License: WTFPL
'use strict';
module.exports = function (client, from, to, message) {
	if (message.match(new RegExp(".*\\ballot\\b.*", "gi"))) {
		client.say(to, "Oi! " + from + '! "allot" is not the word you\'re looking for! "a lot" is the correct term!');
	}
};
