export interface UploadedFile {
  id: string;
  url: string;
}

interface BaseFile {
  id: string;
  file: File;
  name: string;
  size: number;
  mimeType: string;
  url: string;
}

interface IdleFile extends BaseFile {
  status: "idle";
}

interface UploadingFile extends BaseFile {
  status: "uploading";
  progress: number;
  controller: AbortController;
}

interface DoneFile extends BaseFile {
  status: "done";
  uploaded: UploadedFile;
}

interface ErrorFile extends BaseFile {
  status: "error";
  error: string;
}

interface CanceledFile extends BaseFile {
  status: "canceled";
}

export type FileDescriptor =
  | IdleFile
  | UploadingFile
  | DoneFile
  | ErrorFile
  | CanceledFile;
