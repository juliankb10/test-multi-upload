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

/*
Utilicé discriminated unions en para modelar estados válidos del flujo de subida. El progreso 
solo existe en el estado "uploading", evitando inconsistencias mediante type narrowing, igual 
que error solo existe en el estado "error". Separé tipos y lógica utilitaria para mantener 
una arquitectura modular y escalable.
*/
