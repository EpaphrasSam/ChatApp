"use client";

import React, { useState } from "react";
import CustomModal, { Body, Header } from "../global/CustomModal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";

type SettingsModalProps = {
  currentUser: User;
  isOpen?: boolean;
  onClose: () => void;
};

const SettingsModal = ({
  currentUser,
  isOpen,
  onClose,
}: SettingsModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser.name,
      image: currentUser.image,
    },
  });

  const image = watch("image");
  const name = watch("name");

  const handleUpload = async (result: any) => {
    console.log(result);
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        toast.success("Details updated");
        router.refresh();
        onClose();
      })
      .catch((error: any) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const isNoChange = (): boolean => {
    const { name: currentName, image: currentImage } = currentUser;
    const { name, image } = watch();

    if (!name) {
      return true;
    }

    if (!image) {
      return true;
    }

    return currentName === name && currentImage === image;
  };

  const isDisabled = isNoChange() || isLoading;

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Edit your public information
              </p>

              <div className="mt-10 flex flex-col gap-y-8">
                <Input
                  label="Name"
                  value={name}
                  labelPlacement="outside"
                  id="name"
                  type="text"
                  placeholder="Name"
                  disabled={isLoading}
                  errorMessage={errors.name?.message as string}
                  isInvalid={!!errors.name}
                  required
                  className="font-medium text-gray-900"
                  {...register("name")}
                />
                <div className="">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-x-3">
                    <Image
                      src={image || currentUser?.image || "/placeholder.jpg"}
                      width={48}
                      height={48}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <CldUploadButton
                      options={{ maxFiles: 1 }}
                      onUpload={handleUpload}
                      uploadPreset={
                        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
                      }
                    >
                      <button
                        type="button"
                        className="text-gray-700 font-medium outline-none border-none hover:opacity-75"
                        disabled={isLoading}
                        color="default"
                      >
                        Change
                      </button>
                    </CldUploadButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-x-2">
              <Button
                disabled={isLoading}
                color="default"
                radius="sm"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                disabled={isDisabled}
                type="submit"
                radius="sm"
                color={`${isNoChange() ? "default" : "primary"}`}
                isLoading={isLoading}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </Body>
    </CustomModal>
  );
};

export default SettingsModal;
