import React from "react";
import ItemCard from "../item-card";
import { ItemListProps } from "@/@types/admin/admin.interface";

const ItemList = ({ items, onDeleteItem, showUpdateModal }: ItemListProps) => {
  console.log("🚀 ~ ItemList ~ items:ITEMS", items);
  return (
    <>
      {items.map((item) => (
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
