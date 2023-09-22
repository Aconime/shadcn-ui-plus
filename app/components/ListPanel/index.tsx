"use client";

import React, { useState, ReactNode, FC } from "react";
import Image from "next/image";
import {
  SortableContainer,
  SortableElement,
  SortEnd,
} from "react-sortable-hoc";
import Divider from "../Divider";

interface ListItemProps {
  title: string;
  children: ReactNode;
  onExpand?: (expanded: boolean) => void;
}

const ListItem: FC<ListItemProps> = ({ title, children, onExpand }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    onExpand && onExpand(!isExpanded);
  };

  return (
    <div className="p-4 border-b rounded-md shadow-md bg-white border-gray-300 last:border-b-0">
      <div className="flex justify-between items-center cursor-pointer">
        <h3 className="my-0 font-semibold text-lg font-rubik">{title}</h3>
        <div onMouseDown={handleExpand}>
          <Image
            src={isExpanded ? "/arrowUp.svg" : "/arrowDown.svg"}
            alt="arrow"
            width={20}
            height={24}
            priority
          />
        </div>
      </div>
      <div
        className={`mt-1 overflow-hidden transition-all ease-in-out duration-300 ${
          isExpanded ? "max-h-60" : "max-h-0"
        }`}
      >
        <Divider />
        <div className="font-rubik mt-3">{children}</div>
      </div>
    </div>
  );
};

interface Item {
  id: string;
  title: string;
  content: ReactNode;
}

interface SortableItemProps {
  item: Item;
  onExpand?: (expanded: boolean) => void;
}

const SortableItem = SortableElement<SortableItemProps>(
  ({ item, onExpand }) => (
    <ListItem title={item.title} onExpand={onExpand}>
      {item.content}
    </ListItem>
  )
);

interface SortableListProps {
  items: Item[];
  onExpand?: (expanded: boolean) => void;
}

const SortableList = SortableContainer<SortableListProps>(
  ({ items, onExpand }) => {
    return (
      <div className="p-4 flex flex-col gap-2">
        {items.map((item, index) => (
          <SortableItem
            key={item.id}
            index={index}
            item={item}
            onExpand={onExpand}
          />
        ))}
      </div>
    );
  }
);

interface ListPanelProps {
  items: Item[];
}

const ListPanel: FC<ListPanelProps> = ({ items }) => {
  const [currentItems, setCurrentItems] = useState<Item[]>(items);

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    if (oldIndex !== newIndex) {
      const updatedItems = [...currentItems];
      const [movedItem] = updatedItems.splice(oldIndex, 1);
      updatedItems.splice(newIndex, 0, movedItem);
      setCurrentItems(updatedItems);
    }
  };

  return <SortableList items={currentItems} onSortEnd={onSortEnd} />;
};

export default ListPanel;
