const { REST, Routes } = require('discord.js');
const config = require('./config.js');
const fs = require('node:fs');
require("dotenv").config();

const commands = [];
const adminCommands = [];
const commandFiles = fs.readdirSync('./commands/general').filter(file => file.endsWith('.js'));
const adminCommandFiles = fs.readdirSync("./commands/admin").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {//GlobalCommandをJSON化
    const command = require(`./commands/general/${file}`);
    commands.push(command.data.toJSON());
}

for (const file of adminCommandFiles) {//GuildCommandをJSON化
    const command = require(`./commands/admin/${file}`);
    adminCommands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
    try {
        console.log(`${adminCommands.length}個のコマンドを読み込み中`);
        const adminData = await rest.put(//GuildCommandを読み込み
            Routes.applicationGuildCommands(config.clientId, config.dev.testGuild),
            { body: adminCommands },
        );
        console.log(`[GuildCommand]${adminData.length}個のコマンドを読み込み完了`);
        console.log(`${commands.length}個のコマンドを読み込み中`);
        const data = await rest.put(//GlobalCommandを読み込み
            Routes.applicationCommands(config.clientId),
            { body: commands },
        );
        console.log(`[GlobalCommand]${data.length}個のコマンドを読み込み完了`);
    } catch (error) {
        console.error(error);//エラーの場合はエラーログを出力
    }
})();