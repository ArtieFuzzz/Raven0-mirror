const { Monitor } = require('klasa');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, { ignoreOthers: false });
	}

	async run(message) {
		if (!message.guild) return;
		if (message.guild.settings.get('exp_status') === false) return;

		const nextValue = message.author.settings.get('exp') + 1;

		const currentLevel = message.author.settings.get('level');
		const nextLevel = Math.floor(0.1 * Math.sqrt(nextValue + 1));

		await message.author.settings.update([['experience', nextValue], ['level', nextLevel]]);

		if (currentLevel !== nextLevel) {
			await message.send(`Congratulations! You leveled up to level **${currentLevel}**!`);
		}
	}

};