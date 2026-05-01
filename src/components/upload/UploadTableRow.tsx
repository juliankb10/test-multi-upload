"use client";
import type { FileDescriptor } from "@/types/file-descriptor";
import UploadProgress from "./UploadProgress";
import UploadActions from "./UploadActions";

interface Props {
  file: FileDescriptor;
  dispatch: React.Dispatch<any>;
}

export default function UploadTableRow({ file, dispatch }: Props) {
  const progress =
    file.status === "uploading"
      ? file.progress
      : file.status === "done"
        ? 100
        : 0;

  const progressBarColor =
    file.status === "done"
      ? "bg-green-500"
      : file.status === "error"
        ? "bg-red-500"
        : file.status === "canceled"
          ? "bg-gray-400"
          : "bg-blue-500";

  return (
    <tr
      className="
        border-b
        text-left
        hover:bg-gray-50
        transition
      "
    >
      <td className="pl-2 py-3">
        <a
          href="#"
          target="_blank"
          className="
            text-sm
            text-blue-600
            hover:underline
          "
        >
          {file.name}
        </a>
      </td>

      <td className="text-sm text-gray-600">{file.size.toLocaleString()}</td>

      <td className="text-sm text-gray-600">{file.mimeType}</td>

      <td className="p-3 min-w-65">
        <div className="flex items-center gap-3">
          <UploadProgress file={file} />

          <UploadActions file={file} dispatch={dispatch} />
        </div>
      </td>
    </tr>
  );
}
