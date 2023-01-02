const { Client, GatewayIntentBits, EmbedBuilder, Collection } = require('discord.js');//Discord.js読み出し
const client = new Client({
    intents: Object.values(GatewayIntentBits).reduce((a, b) => a | b)//GatewayIntents全定義
});

const fs = require("fs");//ファイルコントロールシステム
require("dotenv").config();//環境変数:Replitの方はこの行を消してください

const config = require("./config.js");//設定ファイル
const functions = require("./functions.js");//タイムスタンプ

// コマンドハンドリング
client.commands = new Collection();
const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
    console.log(`\u001b[32m===${folder} commands===\u001b[0m`);
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));//拡張子がJSの場合
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        try {
            client.commands.set(command.data.name, command);
            console.log(`${command.data.name} がロードされました。`);
        } catch (error) {
            console.log(`\u001b[31m${command.data.name} はエラーによりロードされませんでした。\nエラー内容\n ${error}\u001b[0m`);
        }
    }
    console.log(`\u001b[32m===${folder} loaded===\u001b[0m`);
}

// イベントハンドリング
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));//拡張子がJSの場合
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        try {
            client.once(event.name, (...args) => event.execute(...args, client));
        } catch (error) {
            console.error(`\u001b[31m[${yuika.timeToJST(Date.now(), true)}]\u001b[0m\n`, error)
        }
    } else {
        try {
            client.on(event.name, (...args) => event.execute(...args, client));
        } catch (error) {
            console.error(`\u001b[31m[${yuika.timeToJST(Date.now(), true)}]\u001b[0m\n`, error)
        }
    }
}

// コマンドが来た時
client.on("interactionCreate", async i => {
    if (i.isButton()){//ボタンだった場合
        if (i.customId == "delete") {//コマンドについてくるボタンが削除ボタンだった場合
            i.message.delete()//メッセージ削除
        }
    }
    if (!i.isCommand()) return;//スラッシュコマンド以外は処理を終了
    const command = client.commands.get(i.commandName);
    if (!command) return;

    // こういうやつはclientに生やすと使いやすくなる
    client.func = functions;
    client.config = config;

    //スラッシュコマンドの実行ログをログチャンネルに出力
    try {
        await command.execute(i, client);
        const log = new EmbedBuilder()
            .setTitle("コマンド実行ログ")
            .setDescription(`${i.user.tag}(${i.user.id}) がコマンドを実行しました。`)
            .setColor(config.color)
            .setTimestamp()
            .setThumbnail(i.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                {
                    name: "コマンド",
                    value: "```\n" + i.toString() + "\n```"
                },
                {
                    name: "実行サーバー",
                    value: "```\n" + `${i.guild?.name ?? "DM"}(${i.guild?.id ?? "DM"})` + "\n```",
                    inline: true
                },
                {
                    name: "実行ユーザー",
                    value: "```\n" + `${i.user.tag}(${i.user.id})` + "\n```",
                    inline: true
                }
            )
            .setFooter({ text: String(i.id) })
        client.channels.cache.get(config.logch.command).send({ embeds: [log] })
    } catch (error) {
        console.error(error);
    }

});

// エラー処理 (これ入れないとエラーで落ちる。本当は良くないかもしれない)
process.on("uncaughtException", error => {
    console.error(`[${functions.timeToJST(Date.now(), true)}] ${error.stack}`);
    const embed = new EmbedBuilder()
        .setTitle("ERROR - uncaughtException")
        .setDescription("```\n" + error.stack + "\n```")
        .setColor("#ff0000")
        .setTimestamp();
    client.channels.cache.get(config.logch.error).send({ embeds: [embed] });
});

process.on("unhandledRejection", (reason, promise) => {
    console.error(`\u001b[31m[${functions.timeToJST(Date.now(), true)}] ${reason}\u001b[0m\n`, promise);
    const embed = new EmbedBuilder()
        .setTitle("ERROR - unhandledRejection")
        .setDescription("```\n" + reason + "\n```")
        .setColor("#ff0000")
        .setTimestamp();
    client.channels.cache.get(config.logch.error).send({ embeds: [embed] });
});

// APIサーバー (UptimeRobot用)
const express = require("express");
const app = express();

// ルーティングの設定
app.get("/", (req, res) => {
    const data = {
        "message": "Hello world!",
    }
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data);
});

app.listen(3000, () => {
    console.log(`Opened API Server`);
});

// ログイン
client.login(process.env.BOT_TOKEN);