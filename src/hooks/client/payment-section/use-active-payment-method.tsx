import { useQuery } from "@tanstack/react-query";

export const useActivePaymentMethod = () => {
  const query = useQuery({
    queryKey: ["active-payment-method"],
    queryFn: () =>
      fetch("/api/user/payment-method/active").then((res) => res.json()),
  });

  return query;
};

export default useActivePaymentMethod;
