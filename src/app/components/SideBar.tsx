import React from "react";
import { Home } from "lucide-react";
import { saveToLocalStorage } from "../utils/saveToLocalStorage";
import { SideBarProps } from "../types/interfaces";
import HouseItemInputs from "./HouseItemInputs";

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

  console.log("rendering SideBar");
  return (
    <aside className="w-[350px] bg-gray-100 ml-4 pt-4 pb-4 shadow-md min-h-screen rounded-lg border border-gray-300">
      <h2 className="text-lg pl-4 pb-4 font-semibold text-gray-800">
        Houses List
      </h2>
      <div className="space-y-4 bg-white p-4 shadow-sm">
        {houses.map((house, index) => (
          <HouseItemInputs
            key={index}
            house={house}
            index={index}
            updateHouseName={updateHouseName}
            updateFloors={updateFloors}
            updateColor={updateColor}
            removeHouse={removeHouse}
          />
        ))}

        <button
          className="w-full bg-gray-200 text-gray-800 font-medium p-2 rounded-lg border border-gray-300 flex items-center justify-center space-x-2 hover:bg-gray-300 transition"
          onClick={addNewHouse}
        >
          <Home /> <span> Build a new house</span>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
