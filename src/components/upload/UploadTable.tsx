import type { FileDescriptor } from "@/types/file-descriptor";
import UploadTableRow from "./UploadTableRow";
import type { UploadAction } from "@/store/upload.store";

interface Props {
  files: FileDescriptor[];
  dispatch: React.Dispatch<UploadAction>;
}

export default function UploadTable({ files, dispatch }: Props) {
  return (
    <table className="w-full overflow-hidden rounded-xl border border-collapse bg-white shadow-sm table-auto">
      <thead className="sticky top-0 h-10 border-b bg-gray-200">
        <tr className="text-left">
          <th className="pl-2">Name</th>
          <th>Size</th>
          <th>Mime type</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {files.map((file) => (
          <UploadTableRow key={file.id} file={file} dispatch={dispatch} />
        ))}
      </tbody>
    </table>
  );
}
