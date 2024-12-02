import Loader from "@/components/ui/loader";
import { cn } from "@/lib/common/utils";
import React from "react";

interface QueryStatusProps<T> {
  isLoading: boolean;
  isError: boolean;
  error: any;
  data?: T;
  children: React.ReactNode;
  className?: string;
  dataKey?: keyof T; // Clé pour accéder aux données spécifiques
}

const QueryStatus = <T extends object>({
  isLoading,
  isError,
  error,
  data,
  children,
  className,
  dataKey,
}: QueryStatusProps<T>) => {
  const isEmpty = dataKey
    ? !(
        data &&
        data[dataKey] &&
        Array.isArray(data[dataKey]) &&
        data[dataKey].length > 0
      )
    : !data;

  if (isLoading && isEmpty) {
    return (
      <div
        className={cn(
          "max-w-[1090px] px-[6px] mx-auto h-screen bg-white",
          className
        )}
      >
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

  if (isEmpty) {
    return (
      <div className="text-center text-gray-500">Aucun élément disponible.</div>
    );
  }

  return <>{children}</>;
};

export default QueryStatus;
