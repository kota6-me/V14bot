const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("ユーザーをBAN")
        .addStringOption(
            option => option
            .setName("user")
            .setDescription("ユーザーID")
            .setRequired(true)
        )
        .addStringOption(
            option => option
            .setName("reason")
            .setDescription("BAN執行理由")
            .setRequired(true)
        )
        ,

    async execute(i, client) {
        if(!i.user.id.match("716343156513439845"))return;
        const inputUser = i.options.getString("user");
        if(!inputUser.match(/\d{10,20}/))return i.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle("BAN失敗")
                .setDescription("引数がユーザーIDではない可能性があります。")
                .setColor("#2f3136")
                .setTimestamp()
            ],
            ephemeral: true
        });
        try{
            i.guild.bans.create(
                {
                    user: inputUser,
                    options: {
                        days: 7,
                        reason: i.options.getString("reason")
                    }
                }
            )
        }catch(err){
            i.reply({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("BAN失敗")
                    .setDescription("引数がユーザーIDではない可能性があります。")
                    .setColor("#2f3136")
                    .setTimestamp()
                ],
                ephemeral: true
            })
        }
        i.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle("BAN成功")
                .setDescription("<@!" + inputUser + ">をBANしました。")
                .addFields(
                    {
                        name: "理由",
                        value: i.options.getString("reason")
                    }
                )
                .setColor("#2f3136")
                .setTimestamp()
            ],
            ephemeral: true
        })
    },
}