import { DefaultSession } from "next-auth";

// セッション情報にidを追加するための拡張
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
