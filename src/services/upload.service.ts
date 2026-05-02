interface Params {
  file: File;
  signal: AbortSignal;
  onProgress: (progress: number) => void;
}

interface UploadResponse {
  id: string;
  url: string;
}

export function uploadFile({
  file,
  signal,
  onProgress,
}: Params): Promise<UploadResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/upload");

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) {
        return;
      }

      const progress = Math.round((event.loaded / event.total) * 100);

      onProgress(progress);
    };

    xhr.onload = () => {
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.response);

          resolve(response);
        } else {
          reject(new Error("Upload failed"));
        }
      } catch {
        reject(new Error("Invalid server response"));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error"));
    };

    const abortHandler = () => {
      xhr.abort();

      reject(new DOMException("Aborted", "AbortError"));
    };

    signal.addEventListener("abort", abortHandler);

    xhr.onloadend = () => {
      signal.removeEventListener("abort", abortHandler);
    };

    const formData = new FormData();

    formData.append("file", file);

    xhr.send(formData);
  });
}
