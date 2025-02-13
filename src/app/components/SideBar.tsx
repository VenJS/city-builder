import React from "react";
import { Trash, Home } from "lucide-react";
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
    <aside className="w-[350px] bg-gray-100 ml-4 pt-4 pb-4 shadow-md min-h-screen rounded-lg border border-gray-300">
      <h2 className="text-lg pl-4 pb-4 font-semibold text-gray-800">
        Houses List
      </h2>
      <div className="space-y-4 bg-white p-4 shadow-sm">
        {houses.map((house, index) => (
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
                <label className="text-sm font-medium text-gray-700">
                  Floors:
                </label>
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
                <label className="text-sm font-medium text-gray-700">
                  Color:
                </label>
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
        ))}

        <button
          className="w-full bg-gray-200 text-gray-800 font-medium p-2 rounded-lg border border-gray-300 flex items-center justify-center space-x-2 hover:bg-gray-300 transition"
          onClick={addNewHouse}
        >
         <Home/> <span> Build a new house</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
