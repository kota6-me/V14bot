# Discord.js Ver14 BotSample<br>
**コマンドごとにファイル分けされたBotを作るサンプル**<br>
Replitの方は[こちら](https://github.com/ritsu-me/V14bot#replit%E3%81%A7%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9)をご覧ください

---
このテンプレートは[鮎月さんのV13テンプレート](https://ayutsuki.net/introduction/discord-js-v13-replit/)をV14に翻訳したものとなります。

主な仕様

* discord.js Ver14, @discordjs/rest Ver10, @discordjs/builders, discord-api-typesを使用
* 各種イベントや、コマンドごとにファイル分けが可能。処理も各ファイルに記述することで基幹処理部分(index.js)のコードが長くならないように。

## 使い方(Replit以外)
1. `git clone -b master https://github.com/ritsu-me/V14bot.git` を実行して、このソースをクローンする
2. `npm install --omit=dev`で関連ライブラリをインストールする
3. config.js内部の案内の通りIDをペーストする
4. .env.EXAMPLEの`.EXAMPLE`の部分を外し、`BOT_TOKEN=`に続く部分に[ここ](https://discord.com/developers/applications)で取得したBotのトークンを貼る
5. index.jsを実行

## Replitでの使い方
1. `git clone -b master https://github.com/ritsu-me/V14bot.git` を実行して、このソースをクローンする
2. `npm install --omit=dev`で関連ライブラリをインストールする
3. config.js内部の案内の通りIDをペーストする
4. `.env.EXAMPLE`というファイルを削除し、Replitの「Secrets」という項目(鍵のマーク)にkeyに`BOT_TOKEN`、valueに[ここ](https://discord.com/developers/applications)で取得したBotのトークンを貼る
5. index.jsの7行目とadd_command.jsの4行目の`require("dotenv").config()`を消す
6. index.jsを実行

## コマンド追加方法(共通)
ターミナル、コマンドプロンプト等で`node add_command.js`を実行することで追加されます。

上記の方法でエラーや不具合がありましたらDiscord:`律-Ritsu#0001`のDMまでお願いします。

2023年1月24日一部修正
