import { withAuth } from "next-auth/middleware";

const excludedRoutes = ["/", "/api/register"];

export default withAuth({
  callbacks: {
    authorized: ({ req, token }: any) => {
      if (!token && !excludedRoutes.includes(req.nextUrl.pathname)) {
        return false;
      }

      if (token && req.nextUrl.pathname === "/") {
        return false;
      }

      return true;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
  },
});
