# バーチャル競馬 RC2.9 — Netlify共通レース版

Supabaseなどの外部DBは使いません。Netlify Functionsのサーバー時刻から、2分ごとの共通レース番号と固定シードを生成します。

## 共通になるもの

- レース番号
- 発走時刻
- 出走馬
- 天候・コース
- オッズ
- 着順結果

所持コイン、馬券、所有馬、実績、設定は各ブラウザ内に保存されます。

## 公開手順（推奨：GitHub連携）

1. このフォルダの中身をGitHubリポジトリへアップロードします。
2. Netlifyで既存サイト `keibatualx` を開きます。
3. **Project configuration → Build & deploy → Continuous deployment** からGitHubリポジトリを接続します。
4. Build commandは空欄、Publish directoryは `.` にします。
5. デプロイ後、次のURLをブラウザで開き、JSONが表示されることを確認します。
   - `https://keibatualx.netlify.app/.netlify/functions/current-race`
6. ゲームを2台の端末で開き、レース番号・発走時刻・出走馬・結果が一致するか確認します。

## 注意

Netlifyの手動ドラッグ＆ドロップではビルド処理が走らず、Functionsが公開されない場合があります。GitHub連携またはNetlify CLIでデプロイしてください。

### Netlify CLIを使う場合

```bash
npm install -g netlify-cli
netlify login
netlify link
netlify deploy --prod
```

## 動作確認

設定画面の「共通レース接続」が緑色で「オンライン」と表示されれば成功です。赤い同期エラーが出る場合は、Function URLを直接開いて確認してください。
