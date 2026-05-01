interface Props {
  onSelect: (files: FileList | File[]) => void;
}

export default function UploadDropzone({ onSelect }: Props) {
  return (
    <div
      className="
        flex
        flex-col
        border
        border-dashed
        border-gray-400
        bg-gray-100
        p-6
        text-center
        text-gray-500
      "
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();

        void onSelect(e.dataTransfer.files);
      }}
    >
      <label htmlFor="file-upload" className="cursor-pointer">
        Drag & drop files here or click to upload
      </label>

      <label htmlFor="file-upload" className="mt-4 cursor-pointer">
        Accepted files pdf
      </label>

      <label htmlFor="file-upload" className="cursor-pointer">
        Max files allowed: 10
      </label>

      <input
        id="file-upload"
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          if (!e.target.files) return;

          void onSelect(e.target.files);
        }}
      />
    </div>
  );
}
