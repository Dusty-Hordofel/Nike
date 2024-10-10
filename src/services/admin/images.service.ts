const deleteImageFromCloudinary = async (public_id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/delete-image`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_id }),
    }
  );
  return response.json();
};

export { deleteImageFromCloudinary };
