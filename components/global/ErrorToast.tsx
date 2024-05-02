"use client";

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const ErrorToast = ({ errors }: { errors?: any[] }) => {
  useEffect(() => {
    if (errors && errors.length > 0) {
      errors.forEach((error) => {
        toast.error(error.message || "An error occurred", {
          id: error.id || "error",
        });
      });
    }
  }, [errors]);

  return <Toaster position="top-center" />;
};

export default ErrorToast;
