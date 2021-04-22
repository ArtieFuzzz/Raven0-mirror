const { Client } = require('klasa');
const BotColors = require('./util/colors.js');
const { WebhookClient } = require('discord.js');
const { KSoftClient } = require('@ksoft/api');
require('dotenv').config();

class RavenClient extends Client {

	constructor(...args) {
		super(...args);
		this.colors = BotColors;
		this.shardHook = new WebhookClient(process.env.HOOK_ID, process.env.HOOK_TOKEN);
		this.ksoft = new KSoftClient(process.env.KSOFT_TOKEN);
		this.srod = require('srod-v2');
		this.cache = new Set();

		Client.defaultGuildSchema.add('anti.invite', 'boolean', {
			default: false,
			configurable: false,
		});
		Client.defaultGuildSchema.add('social', 'boolean', {
			default: false,
			configurable: false,
		});
		Client.defaultUserSchema.add('points', 'Integer', {
			default: 0,
			configurable: false,
		});
		Client.defaultUserSchema.add('level', 'Integer', {
			default: 0,
			configurable: false,
		});
	}
	async login() {
		require('../Extensions/message.js');

		return super.login(process.env.TOKEN);
	}
}

module.exports = RavenClient;