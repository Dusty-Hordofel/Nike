import React from "react";
import { cn } from "@/lib/common/utils";
import { FileIcon } from "lucide-react";

interface FileUploadProps {
  previewUrl: string | null | undefined;
}

const FileUpload = ({ previewUrl }: FileUploadProps) => {
  return (
    <div
      className={` gap-x-2  w-full ${
        previewUrl ? "flex flex-col-reverse " : "flex"
      }`}
    >
      <div className={`  overflow-x-auto ${previewUrl && "mt-1 flex gap-x-2"}`}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="preview"
            className="w-40 h-40 object-cover rounded"
          />
        ) : (
          <FileIcon strokeWidth={1.25} size={32} />
        )}
      </div>
      <div className="flex-1 ">
        <p className="text-sm font-semibold  text-start">
          Cliquez pour ajouter une image
        </p>
        <p className="text-xs text-gray-500">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
