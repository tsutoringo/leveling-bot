"use strict"

class Base {
	/**
	 * 
	 * @param {String} [id]
	 */
	constructor(id) {
		if(id) {
			this.id = id;
		}
	}
};

module.exports = Base;