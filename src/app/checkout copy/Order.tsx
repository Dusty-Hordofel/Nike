"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Order = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => fetch("/api/cart").then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  //   const { product } = productQuery.data;
  console.log("🚀 ~ ProductPage ~ product:CART", data);
  return <div>Order</div>;
};

export default Order;
