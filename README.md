## 環境構築

```sh
pnpm i && pnpm dev
```

MSWを有効にするには、.env.localの`APP_ENV`を`mock`にする

## やっていること

- ポケモン一覧ページ・ポケモン詳細ページ
  - Server Componentsで予めフェッチ
  - ページネーションはNext/Linkで実装
- ポケモン名を検索時
  - submit前にConformとZodでエラーチェック
  - OKならServer Actionsを実行
  - useActionStateにより一致したポケモンが描画される
- MSWによるモック化（`src/mocks/msw`にて任意のダミーレスポンスを返せるようにしている）

https://github.com/user-attachments/assets/bb0ab99d-690d-4f3b-93b6-268c73b82345
