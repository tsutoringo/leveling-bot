'use strict';

const Base = require('./Base');
const User = require('./User');
const Channel = require('./Channel');

/**
 * Represents a message
 * @prop {String} id The id of the message
 * @prop {String} content The content of the message
 * @prop {String} subtype subtype of the message
 * @prop {boolean} edited 
 * @prop {Number} timestamp Timestamp of message creation
 * @prop {User} author 
 * @prop {Channel} channel 
 */
class Message extends Base {
	/**
	 * @param {Object} data The message data.
	 * @param {Client} client 
	 */
	constructor ( data, client, idOnly=false ) {
		super( data.id );
		this._client = client;
		this.idOnly = idOnly;
		!idOnly?this.init(data):void 0;
	}
	init(data) {
		this.data = data;

		this.edited = !!data.edited;
		this.authorID = data.user;
		this.timestamp = data.ts;
		this.author = new User({id: data.user}, this._client, true);
		this.channel = new Channel({id: data.channel}, this._client, true);
		this.content = data.text;
		this.subtype = data.subtype;
	}
	/**
	 * reply to this message Thread
	 * @param {String|Object} data 
	 */
	reply(data) {
		if(typeof data === 'string') data = {text: data};
		else data = {...data};

		data.thread_ts = this.timestamp
		this.channel.post(data)
	}
}

module.exports = Message;