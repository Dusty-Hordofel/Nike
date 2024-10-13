import Loader from "@/components/ui/loader";
import React from "react";

interface QueryStatusProps {
  isLoading: boolean;
  isError: boolean;
  error: any;
  children: React.ReactNode;
}

const QueryStatus: React.FC<QueryStatusProps> = ({
  isLoading,
  isError,
  error,
  children,
}) => {
  if (isLoading) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <h1>Error: {error?.message}</h1>
        </div>
      </div>
    );
  }

  return <>{children}</>; // Affiche les enfants (le contenu si tout va bien)
};

export default QueryStatus;
