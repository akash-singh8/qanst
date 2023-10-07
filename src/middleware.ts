import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log(`${req.url} authorized`);
  },
  {
    callbacks: {
      authorized({ token }) {
        return token ? true : false;
      },
    },
  }
);

export const config = {
  matcher: [
    "/api/user",
    "/api/qna",
    "/api/hello",
    "/api/question",
    "/api/answer",
  ],
};
