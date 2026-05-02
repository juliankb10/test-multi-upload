import type { FileDescriptor } from "@/types/file-descriptor";

interface Props {
  file: FileDescriptor;
}

export default function UploadProgress({ file }: Props) {
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
    <div className="flex-1 min-w-30">
      <div
        className="relative h-3 overflow-hidden rounded-full bg-gray-200 shadow-inner"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          aria-live="polite"
          className={`h-full rounded-full transition-all duration-300 ${progressBarColor}`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className=" mt-1 flex items-center justify-between text-[11px] text-gray-500">
        <span>{progress}%</span>
      </div>

      {file.status === "error" && (
        <div className="mt-1 flex items-center gap-1 text-[11px]" role="alert">
          <span className="font-medium text-gray-500">Error:</span>

          <span className="truncate text-red-500" title={file.error}>
            {file.error}
          </span>
        </div>
      )}
    </div>
  );
}
