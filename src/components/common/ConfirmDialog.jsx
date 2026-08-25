import React from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { AlertTriangle } from "lucide-react";

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-red-100 text-red-600 rounded-full">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">{message}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? "Deleting..." : confirmText}
        </Button>
      </div>
    </Modal>
  );
};
