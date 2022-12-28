module.exports = {
    clientId: "BotのID",
    color: "#2f3136",
    token: process.env.BOT_TOKEN,
    dev: {
        testGuild: "GuildCommandを使用するサーバー",
        developer: [
            "開発者のID(Array)"
        ]
    },
    logch: {
    ready: "起動ログチャンネル",
    command: "コマンド実行ログチャンネル",
    error: "エラーログ出力チャンネル",
    guildCreate: "サーバー参加ログチャンネル",
    guildDelete: "サーバー退出ログチャンネル"
    }
}