'use strict';

const Client = require('./lib/Client');

function Slack (token,signingSecret,option) {
	return new Client(token, signingSecret, option);
}

module.exports.Client = Client;
module.exports.User = require('./lib/strcutures/User');
module.exports.Message = require('./lib/strcutures/Message');

module.exports = Slack;