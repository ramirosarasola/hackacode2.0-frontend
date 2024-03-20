import { useState } from "react";

// Custom hook for managing modal state
export const useCustomModal = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return { open, showModal, handleCancel };
};
