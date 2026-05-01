import type { FileDescriptor, UploadedFile } from "@/types/file-descriptor";

export interface UploadState {
  files: FileDescriptor[];
}

export const initialUploadState: UploadState = {
  files: [],
};

export type UploadAction =
  | {
      type: "ADD_FILES";
      payload: FileDescriptor[];
    }
  | {
      type: "START_UPLOAD";
      payload: {
        id: string;
        controller: AbortController;
      };
    }
  | {
      type: "SET_PROGRESS";
      payload: {
        id: string;
        progress: number;
      };
    }
  | {
      type: "UPLOAD_SUCCESS";
      payload: {
        id: string;
        uploaded: UploadedFile;
      };
    }
  | {
      type: "UPLOAD_ERROR";
      payload: {
        id: string;
        error: string;
      };
    }
  | {
      type: "CANCEL_UPLOAD";
      payload: {
        id: string;
      };
    }
  | {
      type: "REMOVE_FILE";
      payload: {
        id: string;
      };
    };

export function uploadReducer(
  state: UploadState,
  action: UploadAction,
): UploadState {
  switch (action.type) {
    case "ADD_FILES": {
      return {
        ...state,
        files: [...state.files, ...action.payload],
      };
    }

    case "START_UPLOAD": {
      return {
        ...state,
        files: state.files.map((file) => {
          if (file.id !== action.payload.id) {
            return file;
          }

          return {
            ...file,
            status: "uploading",
            progress: 0,
            controller: action.payload.controller,
          };
        }),
      };
    }

    case "SET_PROGRESS": {
      return {
        ...state,
        files: state.files.map((file) => {
          if (file.id !== action.payload.id) {
            return file;
          }

          if (file.status !== "uploading") {
            return file;
          }

          return {
            ...file,
            progress: action.payload.progress,
          };
        }),
      };
    }

    case "UPLOAD_SUCCESS": {
      return {
        ...state,
        files: state.files.map((file) => {
          if (file.id !== action.payload.id) {
            return file;
          }

          return {
            ...file,
            status: "done",
            uploaded: action.payload.uploaded,
          };
        }),
      };
    }

    case "UPLOAD_ERROR": {
      return {
        ...state,
        files: state.files.map((file) => {
          if (file.id !== action.payload.id) {
            return file;
          }

          return {
            ...file,
            status: "error",
            error: action.payload.error,
          };
        }),
      };
    }

    case "CANCEL_UPLOAD": {
      return {
        ...state,
        files: state.files.map((file) => {
          if (file.id !== action.payload.id) {
            return file;
          }

          return {
            ...file,
            status: "canceled",
          };
        }),
      };
    }

    case "REMOVE_FILE": {
      return {
        ...state,
        files: state.files.filter((file) => file.id !== action.payload.id),
      };
    }

    default:
      return state;
  }
}
