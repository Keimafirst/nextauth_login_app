import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

/**
 * 資格情報（E-mail・Password）による認証を定義
 */
export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // E-mail・Passwordの入力チェック
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        // emailでユーザー情報を検索 emailはユニークで定義
        const user = await prisma.users.findUnique({
          where: { email: credentials?.email },
        });
        if (!user) return null;

        // 入力PWと複合PWwを照合
        const isValid = await compare(credentials!.password, user.password);
        if (isValid) {
          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // トークン作成・更新
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    // トークンをセッションに展開
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: {
    strategy: "jwt",
    maxAge: 60 * 30, // 30min
  },
  jwt: { maxAge: 60 * 30 },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
