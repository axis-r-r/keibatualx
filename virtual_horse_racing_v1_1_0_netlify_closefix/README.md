# バーチャル競馬 v1.1.0（Netlify版）

Netlifyへフォルダーごとデプロイしてください。

## 時刻同期
- `/.netlify/functions/current-race` からNetlify側の `Date.now()` を取得
- 起動時に50回測定
- 各測定のRTTと推定時刻差を画面表示
- 推定時刻差の中央値をゲーム時計に採用
- 2分ごとに再同期

## レース時間割
- 偶数分00秒: 発走
- 発走から30秒: レース
- 30〜45秒: 結果表示
- 45秒〜次の偶数分: 次走出走表

`netlify.toml`、`netlify/functions/current-race.mjs` を含むルートフォルダーをそのままデプロイしてください。


## Close button hotfix
- 同期完了画面の閉じるボタンを、初期同期開始前に登録。
- HTML onclickも併用し、イベント登録が途中で止まっても閉じられるように修正。
- Service Worker cache keyを更新。
