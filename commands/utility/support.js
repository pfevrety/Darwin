const Command = require('../../structures/Command');
const Guild = require('../../database/schemas/Guild');
const Discord = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
      super(...args, {
        name: 'support',
        description: `Sends you Darwin's Support server`,
        category: 'Utility',
        cooldown: 3
      });
    }

    async run(message) {
      await message.reply("https://discord.gg/UssYQRgsvn")
    }
};