import { useQuery } from "@tanstack/react-query";

const useActiveDeliveryAddress = () => {
  const {
    data: activeDeliveryAddress,
    isSuccess,
    isLoading,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["active-address"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/address/active`).then(
        (res) => res.json()
      ),
  });

  return {
    activeDeliveryAddress,
    isLoading,
    isError,
    error,
    isPending,
    isSuccess,
  };
};

export default useActiveDeliveryAddress;
