"use strict"

const Endpoints = require('./Endpoints');
const axios = require('axios')

class RequestHandler {
	constructor ( client ) {
		this._client = client;
		this.base_url = Endpoints.BASE_URL;
		this.API = axios.create({
			base_url: this.base_url,
		})
	}
	request ( method, url, auth, body, file ) {
		
	}
};

module.exports = RequestHandler;