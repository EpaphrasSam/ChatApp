"use client";

import React from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  bgColor: string;
  color: string;
}

const AuthSocialButton = ({
  icon: Icon,
  onClick,
  bgColor,
  color,
}: AuthSocialButtonProps) => {
  return (
    <motion.button
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
      onClick={onClick}
      whileHover={{
        backgroundColor: bgColor,
        color: color,
        transition: { duration: 0.3 }, // Adjust the duration of the animation
      }}
    >
      <Icon />
    </motion.button>
  );
};

export default AuthSocialButton;
