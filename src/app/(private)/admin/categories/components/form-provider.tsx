"use client";
import React, { ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import useCategoryForm from "../../../../../hooks/admin/categories/use-category-form.hook";

const CategoryFormProvider = ({ children }: { children: ReactNode }) => {
  const { form, handleSubmit } = useCategoryForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormProvider>
  );
};

export default CategoryFormProvider;
