"use client";
import { RotateCcw, Trash2, X } from "lucide-react";
import type { FileDescriptor } from "@/types/file-descriptor";
import {
  handleCancelUpload,
  handleRemoveFile,
  handleRetryUpload,
} from "@/app/actions/upload.action";
import type { UploadAction } from "@/store/upload.store";

interface Props {
  file: FileDescriptor;
  dispatch: React.Dispatch<UploadAction>;
}

export default function UploadActions({ file, dispatch }: Props) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      {file.status === "uploading" && (
        <button
          type="button"
          onClick={() => handleCancelUpload(file, dispatch)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition hover:bg-red-50"
          aria-label="Cancel upload"
        >
          <X size={16} />
        </button>
      )}

      {file.status === "error" && (
        <button
          type="button"
          onClick={() => handleRetryUpload(file, dispatch)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition hover:bg-yellow-50"
          aria-label="Retry upload"
        >
          <RotateCcw size={16} />
        </button>
      )}

      {file.status !== "uploading" && (
        <button
          type="button"
          onClick={() => handleRemoveFile(file, dispatch)}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition hover:bg-red-50"
          aria-label="Remove file"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
}
