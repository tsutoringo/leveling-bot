'use strict';

const { App } = require('@slack/bolt');
const { RTMClient }= require('@slack/rtm-api');
const User = require('./strcutures/User');
const Channel = require('./strcutures/Channel');
const Message = require('./strcutures/Message');
const { EventEmitter } = require('events');

class Client extends EventEmitter {
	constructor( token, signingSecret, options ) {
		super();
		this.token = token;

		console.log(signingSecret);

		this.bolt = new App({
			signingSecret,
			token
		});
		
		this.rtm = new RTMClient(this.token, options.rtm);
		this.options = Object.assign({
			client: {
				events: [
					'message'
				]
			}
		}, options);

		if(this.options.client.events.includes('message')) {
			this.rtm.on('message', event => {
				switch(event.subtype) {
					case void 0:
						this.emit('messageCreate', new Message(event,this));
						break;
				}
			});
		}
	}
	/**
	 * getUser
	 * @param { String } userID The ID of the user
	 * @return { Promise<User> } The User of the ID
	 */
	getUser ( userID ) {
		return this.bolt.client.users.info({
			token: this.token,
			user: userID
		}).then(data => new User(data.user));
	}
	/**
	 * 
	 * @param { String } channelID The channel ID of the channel
	 * @return { Promise<Channel> }
	 */
	getChannel ( channelID ) {
		return this.bolt.client.conversations.info({
			token: this.token,
			channel: channelID
		}).then(data => new Channel(data.channel));
	}
	async connect () {
		await this.rtm.start();
	}
}

module.exports = Client;