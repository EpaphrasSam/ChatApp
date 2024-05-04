"use client";

import React, { useCallback, useState } from "react";
import CustomModal from "../global/CustomModal";
import { Header, Body, Footer } from "../global/CustomModal";
import { useRouter } from "next/navigation";
import useConversation from "@/hooks/useConversation";
import toast from "react-hot-toast";
import axios from "axios";
import { FiAlertTriangle } from "react-icons/fi";
import { Button } from "@nextui-org/react";
import { IoClose, IoTrash } from "react-icons/io5";
import { revalidatePath } from "next/cache";

type ConfirmModalProps = {
  isOpen?: boolean;
  onClose: () => void;
};

const ConfirmModal = ({ isOpen, onClose }: ConfirmModalProps) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(async () => {
    setIsLoading(true);
    await axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        toast.success("Conversation deleted");
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch((error: any) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [conversationId, router, onClose]);

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <Header className="flex gap-2 items-center pb-0">
        <div className="flex items-center justify-center bg-red-200 p-2 rounded-full">
          <FiAlertTriangle className="text-red-600" size={20} />
        </div>
        <span>Delete Conversation</span>
      </Header>

      <Body className="text-gray-500 pl-16">
        Are you sure you want to delete this conversation? This action cannot be
        undone.
      </Body>

      <Footer>
        <Button
          color="default"
          startContent={<IoClose size={20} />}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          color="danger"
          startContent={<IoTrash size={20} />}
          isLoading={isLoading}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Footer>
    </CustomModal>
  );
};

export default ConfirmModal;
