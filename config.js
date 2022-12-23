module.exports = {
    clientId: "BotのID",
    color: "#2f3136",
    token: process.env.DISCORD_TOKEN,
    dev: {
        testGuild: "テストサーバー(管理者用サーバー)のID"
    },
    logch: {
    ready: "起動ログチャンネルのID",
    command: "コマンドログチャンネルのID",
    error: "エラーログチャンネルのID",
    guildCreate: "サーバー追加ログチャンネルのID",
    guildDelete: "サーバー退出ログチャンネルのID"
    }
}