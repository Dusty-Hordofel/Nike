import { useQuery } from "@tanstack/react-query";

export const useGetUserAddress = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["address", id],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/address/active`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }).then((res) => res.json()),
  });
  //   console.log("ADDRESS LIBO", query);
  return query;
};
