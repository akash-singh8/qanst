import NextAuth, { User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../qna";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_AUTH_CLIENT_ID!,
      clientSecret: process.env.NEXT_AUTH_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      try {
        const newUser = await prisma.user.create({
          data: {
            name: user.name as string,
            email: user.email as string,
            pictureUrl: user.image as string,
          },
        });

        console.log("New user added :", newUser);
      } catch (err) {
        console.log("User already added");
      }

      return true;
    },
  },
};

export default NextAuth(authOptions);
