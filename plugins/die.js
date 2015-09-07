// SN4T14 2015-09-07
// License: WTFPL
'use strict';
module.exports = function (client, from, to, message, config) {
	if (from === config.admin && message.indexOf(config.nickname) === 0) {
		if (message.toLowerCase().indexOf("die") > -1) {
			process.exit();
		}
	}
};
