const config = require("../config.js");
const functions = require("../functions.js");

const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "ready", // イベント名
    async execute(client) {
        client.user.setPresence({ activities: [{ name: `My eyes are always on you👀` }], status: "online" });
        client.channels.cache.get(config.logch.ready).send({
            embeds: [
                new EmbedBuilder()
                .setTitle("起動完了")
                .setDescription("> Botが起動しました。\n> 運営担当者は動作チェックをお願いします。")
                .setColor("#2f3136")
                .setTimestamp()
            ]
        });
        console.log(`[${functions.timeToJST(Date.now(), true)}] Logged in as ${client.user.tag}!`);
    }
}