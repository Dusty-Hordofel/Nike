import { useQuery } from "@tanstack/react-query";

const useGetPaymentMethods = () => {
  const query = useQuery({
    queryKey: ["payment-method"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/payment-method`).then(
        (res) => res.json()
      ),
  });
  return query;
};

export default useGetPaymentMethods;
