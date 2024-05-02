import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { UserType } from "@/types/UserType";

export default async function getSession() {
  return (await getServerSession(authOptions)) as {
    user: UserType;
  };
}
