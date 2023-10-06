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

export const config = { matcher: ["/api/auth", "/api/qna", "/api/hello"] };
