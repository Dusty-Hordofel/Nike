import React from "react";
import ItemCard from "./item-card";
import { ItemListProps } from "@/@types/admin/admin.item.interface";
import { EntityToEdit } from "@/context/modal/modal-context";
// import { ItemListProps } from "@/@types/admin/admin.categories.interface";

const ItemList = ({
  items,
  onDeleteItem,
  openModal,
}: {
  openModal: (mode: "create" | "update", item?: EntityToEdit) => void;
  items: any;
  onDeleteItem: any;
}) => {
  return (
    <>
      {items.length > 0 &&
        items.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onDeleteItem={onDeleteItem}
            openModal={openModal}
          />
        ))}
    </>
  );
};

export default ItemList;
