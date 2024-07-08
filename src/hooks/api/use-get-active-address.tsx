import { useQuery } from "@tanstack/react-query";

export const useGetActiveAddress = () => {
  const {
    data: deliveryAddress,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["active-address"],
    queryFn: () => fetch("/api/user/active-address").then((res) => res.json()),
  });

  return { deliveryAddress, isLoading, isError, error };
};
