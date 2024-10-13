"use client";
import React, { ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import useCategoryForm from "./use-category-form";

const CategoryFormProvider = ({ children }: { children: ReactNode }) => {
  const { form, handleSubmit } = useCategoryForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormProvider>
  );
};

export default CategoryFormProvider;
