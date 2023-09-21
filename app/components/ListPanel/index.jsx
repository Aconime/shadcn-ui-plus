"use client";

import Image from "next/image";
import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Divider from "../Divider";

const ItemType = "LIST_ITEM";

const ListItem = React.forwardRef(({ title, children, onExpand }, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    onExpand && onExpand(!isExpanded);
  };

  return (
    <div
      ref={ref}
      className="p-4 border-b rounded-md shadow-md bg-white border-gray-300 last:border-b-0"
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={handleExpand}
      >
        <h3 className="my-0 font-semibold text-lg font-rubik">{title}</h3>
        <Image
          src={isExpanded ? "/arrowUp.svg" : "/arrowDown.svg"}
          alt="arrow"
          width={20}
          height={24}
          priority
        />
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
});

ListItem.displayName = "ListItem";

const DraggableListItem = ({
  id,
  title,
  children,
  onExpand,
  index,
  moveItem,
}) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <ListItem ref={(node) => ref(drop(node))} title={title} onExpand={onExpand}>
      {children}
    </ListItem>
  );
};

const ListPanel = ({ items }) => {
  const [currentItems, setCurrentItems] = useState(items);

  const moveItem = (fromIndex, toIndex) => {
    const updatedItems = [...currentItems];
    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);

    setCurrentItems(updatedItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 flex flex-col gap-2">
        {currentItems.map((item, index) => (
          <DraggableListItem
            key={item.id}
            id={item.id}
            title={item.title}
            index={index}
            moveItem={moveItem}
          >
            {item.content}
          </DraggableListItem>
        ))}
      </div>
    </DndProvider>
  );
};

export default ListPanel;
