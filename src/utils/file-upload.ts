import { FileDescriptor } from "@/types/file-descriptor-A";

export function updateProgress(
  file: FileDescriptor,
  progress: number,
): FileDescriptor {
  if (file.status !== "uploading") {
    return file;
  }

  return {
    ...file,
    progress,
  };
}
