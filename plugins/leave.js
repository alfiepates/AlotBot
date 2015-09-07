// SN4T14 2015-09-07
// License: WTFPL
'use strict';
module.exports = function (client, from, to, message, config) {
	if (from === config.admin && message.indexOf(config.nickname) === 0) {
		if (message.toLowerCase().indexOf("please leave") > -1) {
			var channelIndex = message.toLowerCase().indexOf("please leave") + 13;
			var channel = message.substring(channelIndex).split(" ")[0];

			client.part(channel);
		}
	}
};
