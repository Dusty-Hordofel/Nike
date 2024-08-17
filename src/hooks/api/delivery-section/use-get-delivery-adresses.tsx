import { useQuery } from "@tanstack/react-query";

const useGetDeliveryAddresses = () => {
  const query = useQuery({
    queryKey: ["addresses"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/address`).then(
        (res) => res.json()
      ),
  });

  return query;
};

export default useGetDeliveryAddresses;
