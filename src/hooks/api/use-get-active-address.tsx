import { useQuery } from "@tanstack/react-query";

export const useGetActiveAddress = () => {
  const {
    data: deliveryAddress,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["active-address"],
    queryFn: () => fetch("/api/user/address/active").then((res) => res.json()),
  });

  return { deliveryAddress, isLoading, isError, error };
};
