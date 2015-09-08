// alfiepates 2015-09-07
// License: CC0 1.0
// manpage.js
// manpage grabbification plugin for SN4T14's AlotBot
// note: because i'm really fucking lazy, this plugin can only fetch manpges for section one. apologies if you wanted the manpage for xjack(6)


'use strict';
module.exports = function (client, from, to, message, config) {
	var manRegexResult = new RegExp(".*\\b" + config.nickname + ".*please fetch the manpage for ([^ ]+).*", "gi").exec(message);
	if (manRegexResult !== null) {
		client.say(to, "Here's the manpage for " + manRegexResult[2] + ": http://linux.die.net/man/1/" + manRegexResult[2]);
	}
};


// offtopic: why is sasl in section 6? i'm pretty convinced it's not a screensaver, nor a game.
