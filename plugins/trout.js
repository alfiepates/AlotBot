// alfiepates 2016-04-26
// License: CC0 1.0
// trout.js
// trout-slappin' plugin for SN4T14's AlotBot


'use strict';
module.exports = function (client, from, to, message, config) {
	var troutRegexResult = new RegExp(".*\\b" + config.nickname + ".*slap ([^ ]+).*", "gi").exec(message);
	if (troutRegexResult !== null) {
		client.action(to, "slaps " + troutRegexResult[1] + " with a trout.");
		else {
			client.action(to, "slaps " + from + " with a trout.")
		}
	}
};
