"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

type CustomModalProps = {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
};

const CustomModal = ({
  children,
  isOpen = false,
  onClose,
}: CustomModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isDismissable={false}
      className="z-90"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

export const Header = ModalHeader;
export const Body = ModalBody;
export const Footer = ModalFooter;

export default CustomModal;
