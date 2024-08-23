import { useQuery } from "@tanstack/react-query";

export const useGetCart = () => {
  const query = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/cart`).then((res) =>
        res.json()
      ),
  });

  return query;
};
