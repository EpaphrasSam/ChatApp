"use client";

import { Button, Input } from "@nextui-org/react";
import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [loading, setLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    if (variant === "REGISTER") {
      try {
        await axios.post("/api/register", data).then(() => {
          signIn("credentials", data);
        });
      } catch (error: any) {
        toast.error(error.response.data);
      }
    }
    if (variant === "LOGIN") {
      await signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          toast.error(callback?.error);
        }
        if (callback?.ok && !callback?.error) {
          router.push("/users");
        }
      });
    }

    setLoading(false);
  };

  const socialAction = async (action: string) => {
    setLoading(true);

    await signIn(action, {
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback?.error);
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Logged in");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mt-8 mb-4 sm:mx-auto sm:w-full sm:max-w-md">
      <Toaster position="top-center" />
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              labelPlacement="outside"
              id="name"
              label="Name"
              placeholder="Enter your name"
              errorMessage={errors.name?.message as string}
              isInvalid={!!errors.name}
              disabled={loading}
              className="pb-6"
              {...register("name")}
            />
          )}
          <Input
            id="email"
            labelPlacement="outside"
            label="Email"
            placeholder="Enter your email"
            errorMessage={errors.email?.message as string}
            isInvalid={!!errors.email}
            disabled={loading}
            className="pb-6"
            {...register("email")}
          />
          <Input
            id="password"
            labelPlacement="outside"
            label="Password"
            type="password"
            placeholder="Enter your password"
            errorMessage={errors.password?.message as string}
            isInvalid={!!errors.password}
            disabled={loading}
            className="pb-6"
            {...register("password")}
          />
          <div className="flex items-center justify-center">
            <Button
              radius="sm"
              type="submit"
              fullWidth
              isLoading={loading}
              className={`${loading ? "bg-gray-500" : "bg-sky-500"}`}
              disabled={loading}
            >
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div
              className="
                absolute
                inset-0
                flex
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div
              className="
                relative
                flex
                justify-center
                text-sm
              "
            >
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction("github")}
              bgColor="#181717"
              color="#ffffff"
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction("google")}
              bgColor="#4285F4"
              color="#ffffff"
            />
          </div>

          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === "LOGIN"
                ? "New to ChatApp?"
                : "Already have an account?"}
            </div>
            <div
              onClick={toggleVariant}
              className="underline hover:tracking-wide hover:text-blue-500 hover:animate-appearance-in cursor-pointer"
            >
              {variant === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
