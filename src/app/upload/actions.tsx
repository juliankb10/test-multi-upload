import { uploadFile } from "@/services/upload.service";
import { limitConcurrency } from "@/utils/limit-concurrency";
import type { UploadAction } from "@/store/upload.store";

import type {
  //   ErrorFile,
  FileDescriptor,
  //   UploadingFile,
} from "@/types/file-descriptor";

const MAX_CONCURRENT_UPLOADS = 10;

export async function handleUploadFiles(
  files: FileDescriptor[],
  dispatch: React.Dispatch<UploadAction>,
) {
  const tasks = files.map((file) => {
    return async () => {
      const controller = new AbortController();

      dispatch({
        type: "START_UPLOAD",
        payload: {
          id: file.id,
          controller,
        },
      });

      try {
        const response = await uploadFile({
          file: file.file,
          signal: controller.signal,
          onProgress(progress) {
            dispatch({
              type: "SET_PROGRESS",
              payload: {
                id: file.id,
                progress,
              },
            });
          },
        });

        dispatch({
          type: "UPLOAD_SUCCESS",
          payload: {
            id: file.id,
            uploaded: response,
          },
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          dispatch({
            type: "CANCEL_UPLOAD",
            payload: {
              id: file.id,
            },
          });

          return;
        }

        dispatch({
          type: "UPLOAD_ERROR",
          payload: {
            id: file.id,
            error: error instanceof Error ? error.message : "Upload failed",
          },
        });
      }
    };
  });

  await limitConcurrency(MAX_CONCURRENT_UPLOADS, tasks);
}

export function handleCancelUpload(
  file: FileDescriptor,
  dispatch: React.Dispatch<UploadAction>,
) {
  if (file.status !== "uploading") {
    return;
  }

  file.controller.abort();

  dispatch({
    type: "CANCEL_UPLOAD",
    payload: {
      id: file.id,
    },
  });
}

export async function handleRetryUpload(
  file: FileDescriptor,
  dispatch: React.Dispatch<UploadAction>,
) {
  if (file.status !== "error") {
    return;
  }

  await handleUploadFiles([file], dispatch);
}

export function handleRemoveFile(
  file: FileDescriptor,
  dispatch: React.Dispatch<UploadAction>,
) {
  if (file.status === "uploading") {
    file.controller.abort();
  }

  dispatch({
    type: "REMOVE_FILE",
    payload: {
      id: file.id,
    },
  });
}

interface SubmitUploadFormParams {
  values: {
    title: string;
    description: string;
  };
  files: FileDescriptor[];
}

export async function submitUploadForm({
  values,
  files,
}: SubmitUploadFormParams) {
  const doneFiles = files.filter((file) => file.status === "done");

  const payload = {
    title: values.title,
    description: values.description,
    files: doneFiles.map((file) => ({
      id: file.uploaded.id,
      name: file.name,
      size: file.size,
      type: file.mimeType,
      url: file.uploaded.url,
    })),
  };

  const response = await fetch("/api/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Submit failed");
  }

  return response.json();
}
