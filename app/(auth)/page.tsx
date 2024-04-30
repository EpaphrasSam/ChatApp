import Image from "next/image";
import AuthForm from "@/components/auth/AuthForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    redirect("/users");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/logo.png"
          alt="logo"
          height="120"
          width="120"
          className="mx-auto w-auto"
        />
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
