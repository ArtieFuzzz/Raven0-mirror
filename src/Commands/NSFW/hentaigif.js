const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js')

const ksoft = new KSoftClient(process.env.KSOFT_TOKEN);

class HentaiGifCommand extends Command {
    constructor() {
        super('hentaigif', {
           aliases: ['hentaigif', 'hentaig'],
           category: 'NSFW',
           description: {
               usage: 'hentaigif',
               examples: ['hentaigif'],
               description: 'Returns a random NSFW gif of hentai.'
           }
        });
    }

    async exec(message) {
    if (!message.guild) return true;
    if (!message.channel.nsfw) {
            message.util.send(':x: This command only runs in NSFW channels');
            return true;
        }

    const { url } = await ksoft.images.random('hentai_gif', { nsfw: true });
    const embed = new MessageEmbed()
    .setTitle('Hentai!!')
    .setFooter('Powered by api.ksoft.si')
    .setColor("RANDOM")
    .setTimestamp()
    .setImage(url);
    message.channel.send(embed)
    }
}

module.exports = HentaiGifCommand;