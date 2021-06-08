const Command = require('../../structures/Command');
const {MessageEmbed} = require('discord.js');
const Guild = require('../../database/schemas/Guild');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'ping',
            aliases: ['latency'],
            description: 'Check\'s Darwin\'s latency',
            category: 'Information',
            cooldown: 5
        });
    }

    async run(message) {

        const client = message.client
        const guildDB = await Guild.findOne({
            guildId: message.guild.id
        });

        const language = require(`../../data/language/${guildDB.language}.json`)

        const embed = new MessageEmbed()
            .setTitle(language.ping_calcul)
            .setDescription(`\`${language.pinging}\``)
            .setColor(message.guild.me.displayHexColor)
            .setTimestamp()
            .addField(
                '\u200b',
                '**[Invite](https://invite.darwin.xyz) | ' +
                '[Support Server](https://darwin.xyz/support) | ' +
                '[Dashboard](https://darwin.xyz/dashboard)**')
            .setFooter(`Darwin - pfevrety#1908`, message.client.user.displayAvatarURL({dynamic: true}))

        const msg = await message.channel.send(embed);

        const latency = msg.createdTimestamp - message.createdTimestamp;

        let koko = (language.ping_info).replace("{ping1}", latency)
            .replace("{ping2}",
                Math.round(this.client.ws.ping)
            )

        let color = message.guild.me.displayHexColor
        if (latency < 100) {
            color = `#00ff00`
        } else if (latency > 100 && latency < 300) {
            color = `#CCCC00`
        } else if (latency >= 300) {
            color = message.client.color.red
        } else color = message.guild.me.displayHexColor


        embed.setDescription(`${koko}`)
        embed.setColor(color)
        msg.edit(embed);


    }
};