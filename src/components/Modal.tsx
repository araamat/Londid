import React from "react";
import { createPortal } from "react-dom";

export interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export default function Modal({
  children,
  isOpen,
}: React.PropsWithChildren<ModalProps>) {
  const modalRoot = document.getElementById("modal-root")!;
  if (!isOpen) return;

  return createPortal(
    <div className="flex flex-col items-center justify-center overflow-hidden fixed inset-0 bg-transparent z-50">
      {children}
    </div>,
    modalRoot
  );
}
