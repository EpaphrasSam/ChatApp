"use client";

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const ErrorToast = ({ error }: { error: string | null }) => {
  useEffect(() => {
    if (error) {
      toast.error(error || "An error occurred", { id: "error" });
    }
  }, [error]);

  return <Toaster position="top-center" />;
};

export default ErrorToast;
