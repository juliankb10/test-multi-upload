import * as Yup from "yup";

const MAX_SIZE = 5 * 1024 * 1024;

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
    ),
});
