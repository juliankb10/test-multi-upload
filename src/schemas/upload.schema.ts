import * as Yup from "yup";

const MAX_SIZE = 5 * 1024 * 1024;

const SUPPORTED_TYPES = ["application/pdf"];

export const uploadSchema = Yup.object({
  title: Yup.string().required("Title is required"),

  description: Yup.string().max(300),

  files: Yup.array()
    .min(1)
    .max(10)
    .test(
      "file-size",
      "File exceeds 5MB",
      (files) => files?.every((file) => file.size <= MAX_SIZE) ?? true,
    )
    .test(
      "file-type",
      "Unsupported file type",
      (files) =>
        files?.every((file) => SUPPORTED_TYPES.includes(file.mimeType)) ?? true,
    ),
});
