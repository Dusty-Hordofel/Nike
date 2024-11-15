import { useQuery } from "@tanstack/react-query";

const useGetDeliveryAddress = (id?: string) => {
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

export default useGetDeliveryAddress;
