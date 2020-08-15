'use strict';

const Base = require('./Base');
const Client = require('../Client');

class Channel extends Base {
	/**
	 * @param {Object} data Channel data
	 * @param {Client} client 
	 */
	constructor ( data, client, idOnly=false) {
		super( data.id );
		this._client = client;
		this.idOnly = idOnly;
		!idOnly?this.init(data):void 0;
	}
	/**
	 * return Full instance of Channel
	 * @return {Channel} 
	 */
	async full() {
		return this.idOnly?await this._client.getUser(this):this;
	}
	init(data) {
		this.data = data;
		this.name = data.name;
		this.private = data.isPrivate;
	}
	/**
	 * 
	 * @param {String|Object} data 
	 */
	reply(data) {
		this._client.createMessage(this, data);
	}
}

module.exports = Channel;