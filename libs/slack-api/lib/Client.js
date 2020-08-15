'use strict';

const Bolt = require('@slack/bolt').App;
const { RTMClient } = require('@slack/rtm-api');
const User = require('./strcutures/User');
const Channel = require('./strcutures/Channel');
const Message = require('./strcutures/Message');
const { EventEmitter } = require('events');

/**
 * Represents the main Slack client
 * @extends {EventEmitter} 
 * @prop {String} token token the bot user token
 * @prop {String} signingSecret signingSecret the bot user secret
 * @prop {Bolt} bolt the Official slack client
 * @prop {RTMClient} rtm the Official slack package
 * 
 * @fires Client#messageCreate
 */
class Client extends EventEmitter {
	constructor( token, signingSecret, options ) {
		super();
		this.token = token;
		this.signingSecret = signingSecret

		this.bolt = new Bolt({
			signingSecret,
			token
		});

		this.options = {
			client: Object.assign({
				usingEventListener: 'RTM',
				events: [
					'message'
				]
			}, options.client),
			bolt: Object.assign({
				port: 3000
			},options.bolt)
		};
		console.log(this.options)
		if(this.options.client.usingEventListener === 'RTM') {
			this.rtm = new RTMClient(this.token, options.rtm);
		}
	}
	/**
	 * Get a User object from a user ID
	 * @param { String|User } user The ID of the user
	 * @return { Promise<User> } The User of the ID
	 */
	getUser ( user ) {
		return this.bolt.client.users.info({
			token: this.token,
			user: user instanceof User ? user.id:user
		}).then(data => new User(data.user,this));
	}
	/**
	 * Get a Channel object from a channel ID
	 * @param { String|Channel } channel The channel ID of the channel
	 * @return { Promise<Channel> }
	 */
	getChannel ( channel ) {
		return this.bolt.client.conversations.info({
			token: this.token,
			channel: channel instanceof Channel ? channel.id:channel
		}).then(data => new Channel(data.channel,this));
	}
	/**
	 * register Event listeners with RTM or EventsAPI
	 */
	init() {
		if(this.options.client.usingEventListener === 'RTM') {
			if(this.options.client.events.includes('message')) this.rtm.on('message', event => this._messageEmitter(message));
		} else if(this.options.client.usingEventListener === 'bolt') {
			if(this.options.client.events.includes('message')) this.bolt.event('message', ({ message }) => this._messageEmitter(message));
		}
	}
	/**
	 * Dont call this method
	 */
	_messageEmitter(message) {
		switch(message.subtype) {
			case void 0:
				/**
				 * messageCreate
				 * @event Client#messageCreate
				 * @type {Message}
				 */
				this.emit("messageCreate", new Message(message,this))
				break;
		}
	}
	/**
	 * connecting to slack with RTM or EventsAPI
	 */
	async connect () {
		if(this.options.client.usingEventListener === 'RTM') {
			await this.rtm.start();
			console.info('[INFO]connected to slack with RTM');
		} else if(this.options.client.usingEventListener === 'bolt') {
			await this.bolt.start(this.options.bolt.port);
			console.info('[INFO]connected to slack with EventAPI');
			console.info(`[INFO]PORT: ${this.options.bolt.port}`);
		}
	}
	/**
	 * createNewMessage
	 * @param {Channel} channel
	 * @param {String | Object} data 
	 */
	createMessage (channel, data) {
		if(typeof data === 'string') {
			return this.bolt.client.chat.postMessage({
				token: this.token,
				channel: channel.id,
				text: data
			}).then(data => new Message(data.message,this));
		} else {
			return this.bolt.client.chat.postMessage({
				token: this.token,
				channel: channel.id,
				...data
			}).then(data => new Message(data.message,this));
		}
	}
}

module.exports = Client;