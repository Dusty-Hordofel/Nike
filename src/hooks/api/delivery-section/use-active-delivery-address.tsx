import { useQuery } from "@tanstack/react-query";

const useActiveDeliveryAddress = () => {
  const {
    data: activeDeliveryAddress,
    isLoading,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["active-address"],
    queryFn: () => fetch("/api/user/address/active").then((res) => res.json()),
  });

  return { activeDeliveryAddress, isLoading, isError, error, isPending };
};

export default useActiveDeliveryAddress;
