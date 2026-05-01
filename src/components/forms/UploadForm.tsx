"use client";
import { Form, Formik } from "formik";
import { uploadSchema } from "@/schemas/upload.schema";
import type { FileDescriptor } from "@/types/file-descriptor";

interface UploadFormValues {
  title: string;
  description: string;
}

interface Props {
  files: FileDescriptor[];
  pendingUploads: number;
  hasUploading: boolean;
  allDone: boolean;
  onSubmit: (params: {
    values: UploadFormValues;
    files: FileDescriptor[];
  }) => Promise<void>;
}

export default function UploadForm({
  files,
  pendingUploads,
  hasUploading,
  allDone,
  onSubmit,
}: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Upload Details</h2>

      <Formik<UploadFormValues>
        initialValues={{
          title: "",
          description: "",
        }}
        validationSchema={uploadSchema}
        onSubmit={async (values) => {
          await onSubmit({
            values,
            files,
          });
        }}
      >
        {({ values, errors, touched, handleChange, isValid, isSubmitting }) => (
          <Form className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
                Title
              </label>

              <input
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  p-3
                  outline-none
                  transition
                  focus:border-black
                "
              />

              {touched.title && errors.title && (
                <p
                  className="
                      mt-1
                      text-sm
                      text-red-500
                    "
                >
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-gray-700
                "
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={3}
                value={values.description}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  p-3
                  outline-none
                  transition
                  focus:border-black
                "
              />

              {touched.description && errors.description && (
                <p
                  className="
                      mt-1
                      text-sm
                      text-red-500
                    "
                >
                  {errors.description}
                </p>
              )}
            </div>

            <div
              className="
                rounded-lg
                bg-gray-100
                p-4
                text-sm
                text-gray-700
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <span>Pending uploads</span>

                <span className="font-semibold">{pendingUploads}</span>
              </div>

              <div
                className="
                  mt-2
                  flex
                  items-center
                  justify-between
                "
              >
                <span>Total files</span>

                <span className="font-semibold">{files.length}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || hasUploading || !allDone || isSubmitting}
              className="
                w-full
                rounded-lg
                bg-black
                px-4
                py-3
                font-medium
                text-white
                transition
                hover:opacity-90
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
