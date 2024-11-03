"use client";
import React, { ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import useSubProductForm from "../../../../../hooks/admin/sucategories/use-subcategories-form.hook";

const SubcategoryFormProvider = ({ children }: { children: ReactNode }) => {
  const { form, handleSubmit } = useSubProductForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>{children}</form>
    </FormProvider>
  );
};

export default SubcategoryFormProvider;
