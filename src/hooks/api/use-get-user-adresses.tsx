import { useQuery } from "@tanstack/react-query";

export const useGetUserAddresses = () => {
  const {
    data: addresses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["active-address"],
    queryFn: () => fetch("/api/user/address").then((res) => res.json()),
  });

  return { addresses, isLoading, isError, error };
};
