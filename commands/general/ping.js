const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder() // スラッシュコマンド登録のため
        .setName("ping")
        .setDescription("Ping値を測定"),

    async execute(i, client) {
        const apiPing = Date.now() - i.createdTimestamp
            await i.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle(":ping_pong:Pong!")
                    .setDescription("Ping値を表示します。")
                    .addFields(
                        {
                            name: ":electric_plug:WebSocket Ping",
                            value: "`" + client.ws.ping + "ms`"
                        },
                        {
                            name: ":yarn:API Endpoint Ping",
                            value: "`" + apiPing + "ms`"
                        }
                    )
                    .setColor("#2f3136")
                    .setTimestamp()
                ],
                components: [
                    new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel("🗑️削除")
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId("delete")
                    )
                ]
            })
    },
}