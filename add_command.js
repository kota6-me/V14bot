const { REST, Routes } = require('discord.js');
const config = require('./config.json');
const fs = require('node:fs');

const commands = [];
const adminCommands = [];
const commandFiles = fs.readdirSync('./commands/general').filter(file => file.endsWith('.js'));
const adminCommandFiles = fs.readdirSync("./commands/admin").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/general/${file}`);
    commands.push(command.data.toJSON());
}

for (const file of adminCommandFiles) {
    const command = require(`./commands/admin/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        console.log(`${adminCommands.length}個のコマンドを読み込み中`);
        const adminData = await rest.put(
            Routes.applicationGuildCommands(config.clientID, config.dev.testGuild),
            { body: adminCommands },
        );
        console.log(`[GuildCommand]${adminData.length}個のコマンドを読み込み完了`);
        
        console.log(`${commands.length}個のコマンドを読み込み中`);
        const data = await rest.put(
            Routes.applicationGuildCommands(config.clientID),
            { body: commands },
        );
        console.log(`[GuildCommand]${data.length}個のコマンドを読み込み完了`);

    } catch (error) {
        console.error(error);
    }
})();