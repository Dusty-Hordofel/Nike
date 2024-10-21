export interface Item {
  _id: string;
  name: string;
  slug: string;
  image: string;
  parent?: {
    _id: string;
    name: string;
  };
}

export interface ItemWithId extends Omit<Item, "_id" | "slug"> {
  id: string;
}

export type ItemListProps = {
  items: Item[] | [];
  onDeleteItem: (id: string) => void;
  showUpdateModal: (item: ItemWithId) => void;
};

export interface ItemCardProps {
  item: Item;
  onshowUpdateItemModal: (item: ItemWithId) => void;
  onDeleteItem: (id: string) => void;
}
