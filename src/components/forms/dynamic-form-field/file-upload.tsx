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
  previewUrl?: string | null; // L'URL de prévisualisation du fichier
  //   handleButtonClick: () => void; // La fonction à appeler lors du clic
  //   error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined; // Indique s'il y a une erreur
}

// Composant fonctionnel en TypeScript
const FileUpload: React.FC<FileUploadProps> = ({ previewUrl }) => {
  return (
    <div className="">
      <div className="flex gap-x-2">
        <div className="w-10 bg-red-100">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="preview"
              className="size-10 object-cover rounded"
            />
          ) : (
            <FileIcon strokeWidth={1.25} size={32} />
          )}
        </div>
        <div className="flex-1 bg-purple-300">
          <p className="text-sm font-semibold bg-warning text-start">
            Cliquez pour télécharger
          </p>
          <p className="text-xs text-gray-500">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;