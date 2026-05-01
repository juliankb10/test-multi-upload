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
