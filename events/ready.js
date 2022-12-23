const config = require("../config.js");
const functions = require("../functions.js");

module.exports = {
    name: "ready", // イベント名
    async execute(client) {
        client.user.setPresence({ activities: [{ name: `Type /help | Servers: ${client.guilds.cache.size}` }], status: "online" });
        client.channels.cache.get(config.logch.ready).send("Discordログインしました！");
        console.log(`[${functions.timeToJST(Date.now(), true)}] Logged in as ${client.user.tag}!`);
    }
}