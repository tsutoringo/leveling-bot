'use strict';

const Base = require('./Base');

/**
 * Represents a message
 * @param {String} id The id of the message
 * @param {String} content The content of the message
 * @param {String} subtype subtype of the message
 * @param {boolean} edited 
 */
class Message extends Base {
	/**
	 * @param {Object} data The message data.
	 * @param {Client} client 
	 */
	constructor ( data, client ) {
		super( data.id );
		this.content = data.text;
		this.subtype = data.subtype;
		this._client = client;

		this.data = data;

		this.edited = !!data.edited;

	}
	get ts () {
		return new Date ( this.data.ts );
	}
	get event_ts () {
		return new Date ( this.data.event_ts );
	}
	author () {
		return this._client.getUser( this.data.user );
	}
}

module.exports = Message;