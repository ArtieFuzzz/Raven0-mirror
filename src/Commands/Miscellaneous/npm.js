const { Command } = require('klasa');
const { MessageEmbed } = require('discord.js');
const c = require('@aero/centra');
// Original version is in the Dark Studio discord. This edit is to suit Raven0's needs

class NPMCommand extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['package'],
			usage: '<package:string>',
		});
	}

	async run(message, [pack]) {

		const request = c(`https://registry.npmjs.org/${pack}`);
		const { error, name, maintainers, author, keywords, license } = await request.json();

		if (error) {
			return message.channel.send('Err! Not found');
		}
		else {
			const embed = new MessageEmbed()
				.setAuthor('NPM Package Information', 'https://i.imgur.com/8DKwbhj.png')
				.setThumbnail('https://images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png')
				.addField('Name', name, true)
				.addField('License', license || 'None', true)
				.addField('Author', author ? author.name ? author.name : author : '?', true)
				.addField('Maintainer(s)', maintainers ? maintainers.map(M => M.name).join(', ') : 'None', true)
				.addField('Keywords', keywords ? keywords.join(', ') : 'None')
				.addField('NPMJS', `https://www.npmjs.com/package/${name}`)
				.setImage(`https://nodei.co/npm/${name}.png?downloads=true&compact=true`)
				.setFooter(`Requested By ${message.author.username}`)
				.setTimestamp();
			message.channel.send(embed);
		}
	}
}

module.exports = NPMCommand;