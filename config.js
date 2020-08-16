const { LogLevel } = require('@slack/rtm-api');
require('dotenv').config();

module.exports.TOKEN = process.env.SLACK_BOT_TOKEN;
module.exports.SIGNING_SECRET = void 0;
module.exports.config = {
	client: {
		usingEventListener: 'RTM'
	},
	rtm: {
		dataStore: false,
		useRtmConnect: true,
		logLevel: LogLevel.DEBUG
	},
	bolt: {
		port: 3006
	}
}
module.exports.leveling = {
	startLevelRequiredExp: 400,
	nextLevelRequiredExpRate: 1.15,
	expBoostRate: 1.0,
	expOfMax: 100,
	coolTime: 1900
}
