/* eslint-disable react/display-name */


import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { AnimatePresence, motion } from "framer-motion";
import { FirstFloor, HouseFloor, Roof } from "../assets/assets";
import { DraggableHouseProps } from "../types/interfaces";

const arePropsEqual = (prevProps: DraggableHouseProps, nextProps: DraggableHouseProps) => {
  return (
    prevProps.house.houseName === nextProps.house.houseName &&
    prevProps.house.floors === nextProps.house.floors &&
    prevProps.house.color === nextProps.house.color &&
    prevProps.index === nextProps.index
  );
};

const DraggableHouse = React.memo(({ house, index, moveHouse }: DraggableHouseProps) => {
  const [, ref] = useDrag({
    type: "HOUSE",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "HOUSE",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveHouse(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

 

  console.log('rendering DraggableHouse', index);

  return (
    <div
      ref={(node) => {
        if (node) {
          drop(ref(node));
        }
      }}
      key={index}
      className="flex flex-col items-center"
    >
      <Roof />
      <AnimatePresence>
        {[...Array(house.floors - 1)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <HouseFloor color={house.color} />
          </motion.div>
        ))}
      </AnimatePresence>
      <FirstFloor color={house.color} />
    </div>
  );
}, arePropsEqual);

export { DraggableHouse };
