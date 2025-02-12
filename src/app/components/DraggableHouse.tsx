import { useDrag, useDrop } from "react-dnd";
import { AnimatePresence, motion } from "framer-motion";
import { FirstFloor, HouseFloor, Roof } from "../assets/assets";
import { DraggableHouseProps } from "../types/interfaces";

export function DraggableHouse({
  house,
  index,
  moveHouse,
}: DraggableHouseProps) {
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
}
