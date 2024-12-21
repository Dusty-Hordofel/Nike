import Loader from "./loader";

interface QueryStatusProps<T> {
  queryResult: {
    data?: T[]; // Les données de la requête
    isLoading: boolean; // Si la requête est en cours de chargement
    isError: boolean; // Si une erreur s'est produite
    isSuccess: boolean; // Si la requête a réussi
  };
  entityName: string; // Nom de l'entité à afficher
}

const QueryStatus = <T,>({ queryResult, entityName }: QueryStatusProps<T>) => {
  const { data, isLoading, isError, isSuccess } = queryResult;

  const isOnline = navigator.onLine;

  if (!isOnline) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          No Internet connection. Please check your network.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          Something went wrong while fetching {entityName}. Please try again
          later.
        </div>
      </div>
    );
  }

  if (isSuccess && (!data || data.length === 0)) {
    return (
      <div className="max-w-[1090px] px-[6px] mx-auto h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          {entityName} found.
        </div>
      </div>
    );
  }

  return null;
};

export default QueryStatus;
