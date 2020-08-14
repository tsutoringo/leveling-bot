const Slack = require('./libs/slack-api');
const config = require('./config');
const admin = require('firebase-admin');
let serviceAccount = require('./discord-leveling-firebase-adminsdk-ysnn4-d9f915c33c.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://discord-leveling.firebaseio.com'
});

let coolTimes = {};

let db = admin.firestore();
const bot   = new Slack(config.TOKEN, config.SIGNING_SECRET,config.config);

bot.on('messageCreate',async msg => {
	if(coolTimes[msg.data.user]) return; 
	coolTimes[msg.data.user] = true;
	setTimeout(() => delete coolTimes[msg.data.user],config.leveling.coolTime);

	const exprince = Math.min(msg.content.length*config.leveling.expBoostRate, config.leveling.expOfMax);
	const userRef = db.collection('users').doc(msg.data.user);
	const user = await userRef.get();
	
	if(!user.exists) {
		userRef.set({ 
			nextLevelRequiredExp: config.leveling.startLevelRequiredExp,
			exprince: 0,
			level: 1
		});
	} else {
		let localUser = user.data();
		localUser.exprince += exprince;
		if(localUser.exprince >= localUser.nextLevelRequiredExp) {
			localUser.level += 1;
			localUser.exprince = 0;
			localUser.nextLevelRequiredExp *= config.leveling.nextLevelRequiredExpRate;
			localUser.nextLevelRequiredExp = Number(localUser.nextLevelRequiredExp.toFixed());
		}
		userRef.set(localUser);
	}
});

(async () => {
	await bot.connect();
})();