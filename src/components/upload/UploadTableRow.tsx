"use client";
import type { FileDescriptor } from "@/types/file-descriptor";
import UploadProgress from "./UploadProgress";
import UploadActions from "./UploadActions";
import type { UploadAction } from "@/store/upload.store";

interface Props {
  file: FileDescriptor;
  dispatch: React.Dispatch<UploadAction>;
}

export default function UploadTableRow({ file, dispatch }: Props) {
  return (
    <tr className="border-b text-left hover:bg-gray-50 transition">
      <td className="pl-2 py-3">
        <a
          href={file.url}
          target="_blank"
          className="text-sm text-blue-600 hover:underline"
        >
          {file.name}
        </a>
      </td>

      <td className="text-sm text-gray-600 pl-2 ">
        {file.size.toLocaleString()}
      </td>

      <td className="text-sm text-gray-600 pl-2 ">{file.mimeType}</td>

      <td className="p-3 min-w-65">
        <div className="flex items-center gap-3">
          <UploadProgress file={file} />

          <UploadActions file={file} dispatch={dispatch} />
        </div>
      </td>
    </tr>
  );
}
