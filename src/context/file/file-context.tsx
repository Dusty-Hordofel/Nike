import React, { createContext, useContext, useRef, useState } from "react";
import { UseFormClearErrors, UseFormSetValue } from "react-hook-form";

interface FileContextProps {
  previewUrl: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<any>,
    clearErrors: UseFormClearErrors<any>
  ) => void;
  handleButtonClick: () => void;
  uploadImageToCloudinary: () => Promise<any>;
  picture: File | null;

  //   previewUrl:string | null;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setPicture: React.Dispatch<React.SetStateAction<File | null>>;
  //   resetFile: () => void;
}

const FileContext = createContext<FileContextProps | undefined>(undefined);

export const useFileContext = (): FileContextProps => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext must be used within a FileProvider");
  }
  return context;
};

export const FileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [picture, setPicture] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // const uploadImage = async () => {
  //   let formData = new FormData();
  //   formData.append(
  //     "upload_preset",
  //     process.env.NEXT_PUBLIC_CLOUD_SECRET as string
  //   );
  //   formData.append("file", picture as File);
  //   const { data } = await axios.post(
  //     `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
  //     formData
  //   );
  //   console.log("🚀 ~ uploadImage ~ data:", data);
  //   return data;
  // };

  const uploadImageToCloudinary = async () => {
    let formData = new FormData();
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUD_SECRET as string
    );
    formData.append("file", picture as File);

    try {
      console.log("CLOUDINARY", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       const imageUrl = URL.createObjectURL(file);
  //       setPreviewUrl(imageUrl);
  //     } else {
  //       setPreviewUrl(null);
  //     }
  //   };

  //   const resetFile = () => {
  //     setPreviewUrl(null);
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = "";
  //     }
  //   };

  //   const handleFileChange = (
  //     event: React.ChangeEvent<HTMLInputElement>,
  //     setValue: UseFormSetValue<any>,
  //     clearErrors: UseFormClearErrors<any>
  //   ) => {
  //     const file = event.target.files?.[0];

  //     if (file) {
  //       const imageUrl = URL.createObjectURL(file);
  //       setPreviewUrl(imageUrl);
  //       setPicture(file);
  //       setValue("file", event.target.files);
  //       clearErrors("file");
  //     } else {
  //       setPreviewUrl(null);
  //       setValue("file", null);
  //       clearErrors("file");
  //     }
  //   };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<any>,
    clearErrors: UseFormClearErrors<any>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl); // Prévisualisation de l'image sélectionnée
      setPicture(file); // Enregistrement du fichier dans l'état
      setValue("file", event.target.files); // Mise à jour du champ "file"
      clearErrors("file"); // Effacer les erreurs liées au fichier
    } else {
      setPreviewUrl(null); // Aucune image à afficher
      setPicture(null); // Aucun fichier sélectionné
      setValue("file", null); // Réinitialisation du champ "file"
      clearErrors("file"); // Effacer les erreurs
    }
  };

  return (
    <FileContext.Provider
      value={{
        fileInputRef,
        handleFileChange,
        handleButtonClick,
        uploadImageToCloudinary,
        previewUrl,
        setPreviewUrl,
        picture,
        setPicture,
        // resetFile,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
