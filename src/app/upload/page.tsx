"use client";
import { useMemo, useReducer } from "react";
import {
  filterDuplicateFiles,
  mapFilesToDescriptors,
} from "@/utils/map-files-to-descriptors";
import { uploadReducer, initialUploadState } from "@/store/upload.store";
import { handleUploadFiles, submitUploadForm } from "./actions";
import UploadDropzone from "@/components/upload/UploadDropzone";
import UploadTable from "@/components/upload/UploadTable";
import UploadForm from "@/components/forms/UploadForm";

export default function UploadPage() {
  const [state, dispatch] = useReducer(uploadReducer, initialUploadState);

  const pendingUploads = useMemo(
    () => state.files.filter((file) => file.status === "uploading").length,
    [state.files],
  );

  const hasUploading = state.files.some((file) => file.status === "uploading");

  const allDone =
    state.files.length > 0 &&
    state.files.every((file) => file.status === "done");

  const handleFileSelection = async (files: FileList | File[]) => {
    // const descriptors = mapFilesToDescriptors(files);

    const uniqueFiles = filterDuplicateFiles(Array.from(files), state.files);

    const descriptors = mapFilesToDescriptors(uniqueFiles);

    dispatch({
      type: "ADD_FILES",
      payload: descriptors,
    });

    await handleUploadFiles(descriptors, dispatch);
  };

  return (
    <main className="min-h-screen p-4 sm:p-8">
      <div className=" mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          <UploadDropzone onSelect={handleFileSelection} />

          <div className="overflow-x-auto">
            <UploadTable files={state.files} dispatch={dispatch} />
          </div>
        </section>

        <aside>
          <UploadForm
            files={state.files}
            pendingUploads={pendingUploads}
            hasUploading={hasUploading}
            allDone={allDone}
            onSubmit={submitUploadForm}
          />
        </aside>
      </div>
    </main>
  );
}
