"use client";

import { useRef, useState } from "react";

interface Props {
  onFiles: (files: File[]) => void;
}

export default function UploadDropzone({ onFiles }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(fileList: FileList | null) {
    if (!fileList) {
      return;
    }

    onFiles(Array.from(fileList));
  }

  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setIsDragging(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    if (event.currentTarget.contains(event.relatedTarget as Node)) {
      return;
    }

    setIsDragging(false);
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();

    setIsDragging(false);

    handleFiles(event.dataTransfer.files);
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      openFilePicker();
    }
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label="File upload dropzone"
        onClick={openFilePicker}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          rounded-xl
          border-2
          border-dashed
          p-10
          text-center
          transition
          cursor-pointer
          focus:outline-none
          focus:ring-2
          focus:ring-black
          ${isDragging ? "border-black bg-gray-100" : "border-gray-300"}
        `}
      >
        <p className="font-medium">Drag & drop files here</p>

        <p className="text-sm text-gray-500">or click to browse</p>

        <div aria-live="polite" className="sr-only">
          {isDragging ? "Drop files now" : "Waiting for files"}
        </div>
      </div>

      <input
        id="file-upload"
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
      />
    </>
  );
}
