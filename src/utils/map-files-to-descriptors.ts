import { FileDescriptor } from "@/types/file-descriptor";

export function mapFilesToDescriptors<T extends FileList | File[]>(
  files: T,
): FileDescriptor[] {
  const uniqueFiles = [
    ...Array.from(files)
      .reduce((prev, curr) => {
        const key = `${curr.name}-${curr.size}`;
        prev.set(key, curr);
        return prev;
      }, new Map<string, File>())
      .values(),
  ];

  return uniqueFiles.map((file) => ({
    id: crypto.randomUUID(),
    file,
    name: file.name,
    size: file.size,
    mimeType: file.type,
    status: "idle",
  }));
}

export function filterDuplicateFiles(
  newFiles: File[],
  existingFiles: FileDescriptor[],
) {
  const existingKeys = new Set(
    existingFiles.map((file) => `${file.name}-${file.size}`),
  );

  return newFiles.filter((file) => {
    const key = `${file.name}-${file.size}`;

    return !existingKeys.has(key);
  });
}
