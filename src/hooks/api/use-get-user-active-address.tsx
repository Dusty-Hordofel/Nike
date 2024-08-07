import { useQuery } from "@tanstack/react-query";

export const useGetUserActiveAddress = () => {
  const {
    data: userActiveAddress,
    isLoading,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["active-address"],
    queryFn: () => fetch("/api/user/address/active").then((res) => res.json()),
  });

  return { userActiveAddress, isLoading, isError, error, isPending };
};
