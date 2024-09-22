export const lookupEmail = async (email: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/lookup`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  });
};
