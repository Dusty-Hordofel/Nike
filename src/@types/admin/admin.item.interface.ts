export interface Item1 {
  _id: string;
  name: string;
  slug: string;
  image: string;
  parent?: {
    _id: string;
    name: string;
  };
}
export interface Item2 {
  id: string;
  label: string;
  value: string;
}

export type Item = Item1 | Item2;

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
