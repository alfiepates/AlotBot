// alfiepates 2015-09-07
// License: CC0 1.0
// simple ping pong plugin for SN4T14's AlotBot. useful for checking if people are ignoring you or if your client's just broken

'use strict';
module.exports = function (client, from, to, message, config) {
	if (message.match(new RegExp(".*\\b" + config.nickname + ".*ping\\b.*", "gi"))) {
		client.say(to, "Pong!");
	}
};
