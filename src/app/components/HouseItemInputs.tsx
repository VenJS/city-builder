import React from "react";
import { Trash } from "lucide-react";
import { colorOptions } from "../data/colorOptions";
import { HouseItemProps } from "../types/interfaces";

const arePropsEqual = (prevProps: HouseItemProps, nextProps: HouseItemProps) => {
  return (
    prevProps.house.houseName === nextProps.house.houseName &&
    prevProps.house.floors === nextProps.house.floors &&
    prevProps.house.color === nextProps.house.color &&
    prevProps.index === nextProps.index
  );
};

export const HouseItemInputs = ({
  house,
  index,
  updateHouseName,
  updateFloors,
  updateColor,
  removeHouse,
}: HouseItemProps) => {
  console.log('rendering HouseItemInputs', index);
  return (
    <div
      key={index}
      className="p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50 flex flex-col space-y-3"
    >
      <input
        type="text"
        className="w-2/3 p-2 border rounded text-md font-bold"
        value={house.houseName}
        onChange={(e) => updateHouseName(index, e.target.value)}
      />

      <div className="w-full flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">Floors:</label>
        <input
          type="range"
          className="flex-grow"
          min="1"
          max="10"
          value={house.floors}
          onChange={(e) => updateFloors(index, Number(e.target.value))}
        />
        <span className="text-sm font-medium text-gray-700">
          {house.floors}
        </span>
      </div>

      <div className="w-full flex items-center space-x-2">
        <label className="text-sm font-medium text-gray-700">Color:</label>
        <select
          className="p-1 border border-gray-300 rounded bg-white flex-grow"
          value={house.color}
          onChange={(e) => updateColor(index, e.target.value)}
        >
          {colorOptions.map((color) => (
            <option key={color.value} value={color.value}>
              {color.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => removeHouse(index)}
        className="self-end text-gray-500 hover:text-red-700 transition absolute"
      >
        <Trash size={18} />
      </button>
    </div>
  );
};

export default React.memo(HouseItemInputs, arePropsEqual);