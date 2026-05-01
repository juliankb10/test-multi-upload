import { FileDescriptor } from "@/types/file-descriptor-A";

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
    name: file.name,
    size: file.size,
    mimeType: file.type,
    status: "idle",
  }));
}

/*
Utilicé Array.from para normalizar tanto FileList como File[] en una estructura iterable 
uniforme. La eliminación de duplicados se implementó mediante Map, usando name + size como 
clave compuesta y evitar uploads redundantes. Finalmente, se asigna un identificador con 
crypto.randomUUID() para facilitar rendering en React.
*/
