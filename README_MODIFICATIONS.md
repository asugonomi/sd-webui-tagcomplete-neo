# sd-webui-tagcomplete-neo — asugonomi fork

半角スペース後の補完継続、カンマ区間単位の置換、Worker検索、関連タグUI、日本語正規化、整形を追加。Fullタグ辞書とAnima 2.9B用日本語翻訳を同梱。

元プロジェクト: https://github.com/eduardoabreu81/sd-webui-tagcomplete-neo

ベースコミット: `645f22f0d8ba5ad7f10f54aadcf292cf0499e9f8`。2026-11-08に確認した上流最新版へ独自機能を統合しています。

## 導入と復元

バックアップと対応版チェック付きの導入は [ForgeNeoModification](https://github.com/asugonomi/ForgeNeoModification) を利用してください。管理ツール経由の場合は元の上流版へ差分を適用し、HEAD/remoteは変更しません。

このフォークを直接利用する場合は既存拡張と二重に配置しないでください。直接導入したファイルは管理ツールの復元対象にはなりません。個人設定・モデル・APIキー・ログ・使用履歴は同梱していません。

## ライセンス

MIT。上流のライセンス・著作権表示を保持しています。変更部分はこのドキュメントとコミット差分で識別できます。上流作者による保証・推奨を示すものではありません。

## 検証の範囲

配布元の固定コミットからのファイル適用・ハッシュ一致・復元と、該当Python/JavaScriptの構文を確認しています。今回の公開作業でGPU生成・モデルマージ・ブラウザーでの全機能確認は実施していません。

## 同梱辞書

Settings → Tag Autocompleteで `danbooru_20260731.csv` と `danbooru_translations_jp_anima29.csv` を選択します。既存の選択設定は自動で変えません。`DICTIONARIES.json` に件数とSHA256を記録しています。

入力イベントの120ms遅延同期はForgeNeoModificationの独立した「入力応答改善」拡張で提供します。通常の補完機能はそれが無くても利用できます。TagComplete-Neo-Multi-CSVとの同時有効化は避けてください。

## 関連タグ（任意）

生成済みSQLiteや個人の使用頻度DBは同梱しません。索引が無ければ関連タグをOFFにしてください。通常補完・整形・日本語検索は使えます。

[ComfyUI-Autocomplete-Plus](https://github.com/newtextdoc1111/ComfyUI-Autocomplete-Plus) の公開データ `danbooru_tags.csv` と `danbooru_tags_cooccurrence.csv`（gzipも可）を用意し、次を実行すると `plus_data/related.sqlite3` を作成できます。既存索引は上書きしません。

```text
python tools/build_related_index.py path/to/danbooru_tags.csv path/to/danbooru_tags_cooccurrence.csv.gz
```

関連タグデータと同梱辞書は更新日・母数が異なります。7月31日版の共起を再計算したものではありません。追加UI/整形/正規化はnewtextdoc1111のMIT実装からの部分移植で、元ライセンスは `plus_data/LICENSE.Autocomplete-Plus` に保持しています。

## 上流最新版への統合

設定の即時反映とUIプリセットによるAnima判定を保持。文字コード・改行だけの差分を除去しました。上流連携のNode回帰テスト4件が通っています。
