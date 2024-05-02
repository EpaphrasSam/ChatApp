import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }: any) => {
      if (!token && req.nextUrl.pathname !== "/") {
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
