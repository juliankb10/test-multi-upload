interface Params {
  file: File;
  signal: AbortSignal;
  onProgress: (progress: number) => void;
}

export function uploadFile({ file, signal, onProgress }: Params): Promise<{
  id: string;
  url: string;
}> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;

      const progress = Math.round((event.loaded / event.total) * 100);

      onProgress(progress);
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(new Error("Upload failed"));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error"));
    };

    signal.addEventListener("abort", () => {
      xhr.abort();
      reject(new DOMException("Aborted", "AbortError"));
    });

    xhr.open("POST", "http://localhost:8000/v1/uploads");

    const formData = new FormData();

    formData.append("file", file);

    xhr.send(formData);
  });
}
