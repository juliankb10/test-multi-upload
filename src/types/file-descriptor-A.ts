interface BaseFile {
  id: string;
  name: string;
  size: number;
  mimeType: string;
}

interface IdleFile extends BaseFile {
  status: "idle";
}

interface UploadingFile extends BaseFile {
  status: "uploading";
  progress: number;
}

interface DoneFile extends BaseFile {
  status: "done";
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
