これは、create-next-app で初期化された Next.js プロジェクトです。

## はじめに

練習用に作成した簡易的なログイン機能です。

まず、開発サーバーを起動してください。

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

結果を見るにはブラウザ [http://localhost:3000](http://localhost:3000)で開いてください。

## 機能概要

- ログイン画面・ユーザー登録画面・ログイン成功画面
- セッション管理
- middleware でのルーティング（ページ単位）のアクセス制御

<br>

## 使用技術

| Category | Technology Stack           |
| -------- | -------------------------- |
| Frontend | TypeScript, Next.js        |
| Backend  | TypeScript, NestJS, Prisma |
| Database | MySQL                      |
| Design   | Shadcn UI, Tailwind CSS    |
| etc.     | ESLint, Next-auth.js       |

<br>

## 参考 URL

- [画面](https://ui.shadcn.com/docs/components/card)
- [middleware](https://nextjs.org/docs/app/api-reference/file-conventions/middleware)
- [認証操作](https://next-auth.js.org/getting-started/typescript)
