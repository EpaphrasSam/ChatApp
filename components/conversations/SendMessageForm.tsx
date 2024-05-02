"use client";

import useConversation from "@/hooks/useConversation";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

const SendMessageForm = () => {
  const { conversationId } = useConversation();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setValue("message", "", { shouldValidate: true });
    await axios
      .post("/api/messages", {
        ...data,
        conversationId,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const messageValue = watch("message");

  const handleUpload = async (result: any) => {
    await axios
      .post(`/api/messages`, {
        image: result?.info?.secure_url,
        conversationId,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={handleUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        <HiPhoto
          size={30}
          className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
        />
      </CldUploadButton>

      <form
        className="flex items-center gap-2 lg:gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          color="primary"
          variant="bordered"
          radius="full"
          type="text"
          value={messageValue}
          placeholder="Write a message"
          errorMessage={errors.message?.message as string}
          className="w-full"
          isInvalid={!!errors.message}
          {...register("message")}
        />
        <Button
          isIconOnly
          isDisabled={!messageValue}
          className="bg-sky-500 hover:bg-sky-600 transition"
          radius="full"
          type="submit"
          startContent={<HiPaperAirplane size={18} className="text-white" />}
        />
      </form>
    </div>
  );
};

export default SendMessageForm;
