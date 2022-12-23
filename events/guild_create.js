const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

module.exports = {
    name: "guildCreate",
    async execute(guild, client) {
        client.user.setActivity(`Type /help | Servers: ${client.guilds.cache.size}`);
        const addEmbed = new EmbedBuilder()
            .setTitle("サーバー追加")
            .setDescription(`${guild.name}(${guild.id})にBotが追加されました。`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor(config.color)
            .setTimestamp();
        client.channels.cache.get(config.logch.guildCreate).send({embeds: [addEmbed]});
    }
}