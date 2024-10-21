import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";

// import { z } from 'zod';

const productSchema = z
  .object({
    name: z.string().min(1, "Product name is required"),
    price: z.number().min(1, "Price is required"),
    adultGender: z.enum(["male", "female", "unisex"], {
      errorMap: () => ({ message: "Please select a valid gender for adults" }),
    }),
    kids: z.boolean().optional(),
    kidsGender: z.enum(["boy", "girl", "unisex"]).optional(),
  })
  .refine((data) => !data.kids || data.kidsGender, {
    message: "Please select gender for kids",
    path: ["kidsGender"], // Erreur spécifique pour kidsGender si kids est activé
  });

type ProductFormType = z.infer<typeof productSchema>;

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isKids = watch("kids", false);

  const onSubmit = async (data: ProductFormType) => {
    setIsSubmitting(true);
    const response = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsSubmitting(false);

    if (response.ok) {
      alert("Product created successfully");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Product Name</label>
        <input {...register("name")} type="text" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Price</label>
        <input {...register("price", { valueAsNumber: true })} type="number" />
        {errors.price && <p>{errors.price.message}</p>}
      </div>

      <div>
        <label>Gender (for adults)</label>
        <select {...register("adultGender")}>
          <option value="">Select gender for adults</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unisex">Unisex</option>
        </select>
        {errors.adultGender && <p>{errors.adultGender.message}</p>}
      </div>

      <div>
        <label>
          <input {...register("kids")} type="checkbox" />
          Kids
        </label>
      </div>

      {isKids && (
        <div>
          <label>Kids Gender</label>
          <select {...register("kidsGender")}>
            <option value="">Select gender for kids</option>
            <option value="boy">Boy</option>
            <option value="girl">Girl</option>
            <option value="unisex">Unisex</option>
          </select>
          {errors.kidsGender && <p>{errors.kidsGender.message}</p>}
        </div>
      )}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default ProductForm;
