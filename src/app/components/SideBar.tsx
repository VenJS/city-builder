import React from "react";
import { Trash } from "lucide-react";
import { colorOptions } from "../data/colorOptions";
import { saveToLocalStorage } from "../utils/saveToLocalStorage";
import { SideBarProps } from "../types/interfaces";

const SideBar = ({ houses, setHouses }: SideBarProps) => {
  const addNewHouse = () => {
    const updatedHouses = [
      ...houses,
      { houseName: `House ${houses.length + 1}`, floors: 3, color: "#FFA500" },
    ];
    setHouses(updatedHouses);
    saveToLocalStorage(updatedHouses);
  };

  const removeHouse = (index: number) => {
    const updatedHouses = houses.filter((_, i) => i !== index);
    setHouses(updatedHouses);
    saveToLocalStorage(updatedHouses);
  };

  const updateFloors = (index: number, value: number) => {
    const updatedHouses = houses.map((house, i) =>
      i === index ? { ...house, floors: value } : house
    );
    setHouses(updatedHouses);
    saveToLocalStorage(updatedHouses);
  };

  const updateColor = (index: number, value: string) => {
    const updatedHouses = houses.map((house, i) =>
      i === index ? { ...house, color: value } : house
    );
    setHouses(updatedHouses);
    saveToLocalStorage(updatedHouses);
  };

  const updateHouseName = (index: number, value: string) => {
    const updatedHouses = houses.map((house, i) =>
      i === index ? { ...house, houseName: value } : house
    );
    setHouses(updatedHouses);
    saveToLocalStorage(updatedHouses);
  };
  return (
    <aside className="w-1/4 bg-gray-100 p-4 shadow-md min-h-screen">
      <h2 className="text-lg font-semibold">Houses List</h2>
      <div className="space-y-4 bg-white">
        {houses.map((house, index) => (
          <div
            key={index}
            className="p-2 border rounded mb-2 flex flex-col items-start space-y-2"
          >
            <input
              type="text"
              className="w-full p-2 border rounded text-md font-bold"
              value={house.houseName}
              onChange={(e) => updateHouseName(index, e.target.value)}
            />

            <div className="w-full">
              <label className="block text-sm font-medium">Floors:</label>
              <input
                type="range"
                className="w-full"
                min="1"
                max="10"
                defaultValue={house.floors}
                onChange={(e) => updateFloors(index, Number(e.target.value))}
              />
              <span className="block text-sm text-gray-700">
                {house.floors} floors
              </span>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium">Color:</label>
              <select
                className="w-full p-2 border rounded"
                defaultValue={house.color}
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
              className="self-end text-red-500 hover:text-red-700"
            >
              <Trash size={20} />
            </button>
          </div>
        ))}

        <button
          className="w-full bg-blue-500 text-white p-2 rounded"
          onClick={addNewHouse}
        >
          Build a new house
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
