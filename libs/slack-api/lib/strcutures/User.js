'use strict';

const Base = require('./Base');
const Client = require('../Client');

/**
 * @prop {id} id The ID of the user
 * @prop {boolean} bot 
 * @prop {boolean} owner
 * @prop {boolean} admin
 * @prop {boolean} deleted
 * @prop {boolean} idOnly 
 * @prop {string} username
 * @prop {nickname} nickname
 */
class User extends Base {
	/**
	 * 
	 * @param {*} data 
	 * @param {Client} client 
	 * @param {boolean} [idOnly=false]
	 */
	constructor( data, client, idOnly=false ) {
		super( data.id );
		this._client = client;
		this.idOnly = idOnly;
		!idOnly?this.init(data):void 0;
	}
	get displayName () {
		return this.nickname || this.username;
	}
	get mention() {
		return `<@${this.id}>`
	}
	async full() {
		return this.idOnly?await this._client.getUser(this):this;
	}
	init(data) {
		this.bot = data.is_bot;
		this.owner = data.is_owner;
		this.admin = data.is_admin;

		this.deleted = data.deleted;
		this.data = data;

		this.username = data.prfile.real_name;
		this.nickname = data.prfile.display_name;
	}
}

module.exports = User;