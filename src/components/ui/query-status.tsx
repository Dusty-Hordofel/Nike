import Loader from "@/components/ui/loader";
import { cn } from "@/lib/common/utils";
import React from "react";

interface QueryStatusProps {
  isLoading: boolean;
  isError: boolean;
  error: any;
  children: React.ReactNode;
  className?: string;
  data?: any;
}

const QueryStatus: React.FC<QueryStatusProps> = ({
  isLoading,
  isError,
  error,
  children,
  className,
  data,
}) => {
  if (isLoading) {
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

  if (!data) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen">
        <div className="flex justify-center items-center h-full">
          <h1>No data available</h1>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default QueryStatus;

// interface QueryStatusProps<T> {
//   isLoading: boolean;
//   isError: boolean;
//   error: any;
//   data: T | null;
//   className?: string;
//   children: (data: T) => React.ReactNode; // Fonction qui prend les données et rend le contenu
// }

// const QueryStatus = <T,>({
//   isLoading,
//   isError,
//   error,
//   data,
//   className,
//   children,
// }: QueryStatusProps<T>) => {
//   if (isLoading) {
//     return (
//       <div
//         className={cn(
//           "max-w-[1090px] px-[6px] mx-auto h-screen bg-white",
//           className
//         )}
//       >
//         <div className="flex justify-center items-center h-full">
//           <Loader />
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="max-w-[1090px] px-[6px] mx-auto h-screen">
//         <div className="flex justify-center items-center h-full">
//           <h1>Error: {error?.message}</h1>
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="max-w-[1090px] px-[6px] mx-auto h-screen">
//         <div className="flex justify-center items-center h-full">
//           <h1>No data available</h1>
//         </div>
//       </div>
//     );
//   }

//   return <>{children(data)}</>;
// };

// export default QueryStatus;
