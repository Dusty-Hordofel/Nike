const createSubCategory = async (subCategoryInformation: {
  name: string;
  image: string;
  parent: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`,
    {
      method: "POST",
      body: JSON.stringify(subCategoryInformation),
    }
  );
  return response.json();
};

const deleteSubCategory = async (subCategoryInformation: { id: string }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`,
    {
      method: "DELETE",
      body: JSON.stringify(subCategoryInformation),
    }
  );
  return response.json();
};

const getSubCategories = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`
  );
  if (!response.ok) throw new Error("Failed to fetch categories.");

  const { subCategories } = await response.json();
  console.log("🚀 ~ queryFn: ~ products:", subCategories);
  return subCategories;
};

const updateSubCategory = async (subCategoryInformation: {
  id: string;
  name: string;
  image: string;
  parent: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/admin/subcategories`,
    {
      method: "PUT",
      body: JSON.stringify(subCategoryInformation),
    }
  );
  return response.json();
};

export {
  createSubCategory,
  deleteSubCategory,
  getSubCategories,
  updateSubCategory,
};
