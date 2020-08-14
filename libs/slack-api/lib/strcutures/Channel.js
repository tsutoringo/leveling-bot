'use strict';

const Base = require('./Base');

class Channel extends Base {
	/**
	 * @param {Object} data Channel data
	 * @param {Client} client 
	 */
	constructor ( data, client ) {
		super( data.id );
		this._client = client;
		this.data = data;
		this.name = data.name;
		this.private = data.isPrivate;
	}
}

module.exports = Channel;