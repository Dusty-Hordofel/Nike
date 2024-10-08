import React from "react";
import { cn } from "@/lib/utils"; // Votre utilitaire pour la gestion des classes CSS
import { FileIcon } from "lucide-react"; // Assurez-vous d'importer correctement votre icône ou de la remplacer
import {
  FieldError,
  FieldErrors,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from "react-hook-form";

// Définir les types des props
interface FileUploadProps {
  previewUrls: string | null; // L'URL de prévisualisation du fichier
  //   handleButtonClick: () => void; // La fonction à appeler lors du clic
  //   error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined; // Indique s'il y a une erreur
}

// Composant fonctionnel en TypeScript
const FileUpload: React.FC<FileUploadProps> = ({ previewUrls }) => {
  return (
    <div
      className={` gap-x-2 bg-warning w-full ${previewUrls && previewUrls.length > 0 ? "flex flex-col-reverse " : "flex"}`}
    >
      <div
        className={` bg-red-100 overflow-x-auto ${previewUrls && previewUrls.length > 0 && "mt-1 flex gap-x-2"}`}
      >
        {previewUrls && previewUrls.length > 0 ? (
          previewUrls.map((previewUrl) => (
            <img
              src={previewUrl}
              alt="preview"
              className="w-40 h-40 object-cover rounded"
            />
          ))
        ) : (
          <FileIcon strokeWidth={1.25} size={32} />
        )}
      </div>
      <div className="flex-1 bg-purple-300">
        <p className="text-sm font-semibold bg-warning text-start">
          Cliquez pour ajouter des images
        </p>
        <p className="text-xs text-gray-500">
          SVG, PNG, JPG or GIF (MAX. 800x400px)
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
