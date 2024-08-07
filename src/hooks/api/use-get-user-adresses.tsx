import { useQuery } from "@tanstack/react-query";

export const useGetUserAddresses = () => {
  const query = useQuery({
    queryKey: ["addresses"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/address`).then(
        (res) => res.json()
      ),
  });

  return query;
};
