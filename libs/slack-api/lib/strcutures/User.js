'use strict';

const Base = require('./Base');

/**
 * @prop {id} id The ID of the user
 * @prop {boolean} bot
 * @prop {boolean} owner
 * @prop {boolean} admin
 * @prop {boolean} deleted
 * @prop {string} username
 * @prop {nickname} nickname
 */
class User extends Base {
	constructor( data, client ) {
		super( data.id );
		this._client = client;

		this.bot = data.is_bot;
		this.owner = data.is_owner;
		this.admin = data.is_admin;

		this.deleted = data.deleted;
		this.data = data;

		this.username = data.prfile.real_name;
		this.nickname = data.prfile.display_name;
	}
	get displayName () {
		return this.nickname || this.username;
	}
}

module.exports = User;