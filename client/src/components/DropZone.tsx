import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";

type TDropZone<T> = {
  setFiles: React.Dispatch<React.SetStateAction<T[]>>;
};

export const DropZone: React.FC<TDropZone<File>> = ({ setFiles }) => {
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop: (event) => setFiles(event),
    maxFiles: 10,
  });

  let error = "";

  if (fileRejections.length) {
    const { errors } = fileRejections[0];
    error = errors[0].message;
  } else {
    error = "";
  }

  return (
    <div
      {...getRootProps()}
      className="flex cursor-pointer flex-col items-center justify-center gap-8"
    >
      <input {...getInputProps()} />
      <ImagePlus className="h-12 w-12" />
      <p>Drag 'n' drop some files here, or click to select files</p>
      {error ? (
        <p className="text-sm text-destructive">
          {error}, only 10 files allowed
        </p>
      ) : null}
    </div>
  );
};
