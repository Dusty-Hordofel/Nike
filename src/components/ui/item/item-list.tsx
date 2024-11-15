import React from "react";
import ItemCard from "./item-card";
import { EntityToEdit } from "@/context/modal/modal.context";

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
        items.map((item: any) => (
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
