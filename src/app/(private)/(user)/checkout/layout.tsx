import CheckoutProviders from "../../../../components/common/checkout/checkout-providers";

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CheckoutProviders>{children}</CheckoutProviders>;
}
