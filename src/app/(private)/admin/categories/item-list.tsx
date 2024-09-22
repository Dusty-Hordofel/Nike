import React from "react";
import ItemCard from "../item-card";
import { ItemListProps } from "@/@types/admin/admin.categories.interface";

const ItemList = ({ items, onDeleteItem, showUpdateModal }: ItemListProps) => {
  return (
    <>
      {items?.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onDeleteItem={onDeleteItem}
          onshowUpdateItemModal={showUpdateModal}
        />
      ))}
    </>
  );
};

export default ItemList;
