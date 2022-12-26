const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

module.exports = {
    name: "guildDelete",
    async execute(guild, client) {
        const delEmbed = new EmbedBuilder()
            .setTitle("サーバー退出")
            .setDescription(`${guild.name}(${guild.id})からBotが退出しました。`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor(config.color)
            .setTimestamp();
        client.channels.cache.get(config.logch.guildDelete).send({embeds: [delEmbed]});
    }
}