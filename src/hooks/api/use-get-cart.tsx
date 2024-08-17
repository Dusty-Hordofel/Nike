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

// console.log("🚀 ~ DeliverySection ~ ul:UULLL", deliveryStep);
// const { data, isLoading, isError, error } = useQuery({
//   queryKey: ["cart"],
//   queryFn: () => fetch("/api/user/cart").then((res) => res.json()),
// });

// if (isLoading) return <OrderSummarySkeleton />;
// if (isError) return <p>Error...</p>;

// const { cart } = data;
