"use client";
import { FirstFloor, HouseFloor, Roof } from "./assets/assets";
import { useState } from "react";
import { Trash } from "lucide-react";

export default function Home() {
  const [houses, setHouses] = useState([{ floors: 3, color: "#ff0000" }]);

  const colorOptions = [
    { name: "Orange", value: "#FFA500" },
    { name: "Alizarin", value: "#E74C3C" },
    { name: "Belize", value: "#2980B9" },
    { name: "Emerald", value: "#2ECC71" },
  ];

  const addNewHouse = () => {
    setHouses([...houses, { floors: 3, color: "#ff0000" }]);
  };

  const removeHouse = (index: number) => {
    setHouses(houses.filter((_, i) => i !== index));
  };

  const updateFloors = (index: number, value: number) => {
    const updatedHouses = houses.map((house, i) =>
      i === index ? { ...house, floors: value } : house
    );
    setHouses(updatedHouses);
  };

  const updateColor = (index: number, value: string) => {
    const updatedHouses = houses.map((house, i) =>
      i === index ? { ...house, color: value } : house
    );
    setHouses(updatedHouses);
  };
  return (
    <div className="min-h-screen">
      <header className="bg-gray-100 mb-5 shadow-md p-4 text-red-600 text-2xl font-bold">
        City Builder
      </header>

      <div className="flex">
        <aside className="w-1/4 bg-gray-100 p-4 shadow-md min-h-screen">
          <h2 className="text-lg font-semibold">Houses List</h2>
          <div className="space-y-4">
            {houses.map((house, index) => (
              <div
                key={index}
                className="p-2 border rounded mb-2 flex flex-col items-start space-y-2"
              >
                <h3 className="text-md font-bold">House {index + 1}</h3>

                <div className="w-full">
                  <label className="block text-sm font-medium">Floors:</label>
                  <input
                    type="range"
                    className="w-full"
                    min="1"
                    max="10"
                    defaultValue={house.floors}
                    onChange={(e) =>
                      updateFloors(index, Number(e.target.value))
                    }
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

        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="flex gap-4">
            <Roof />
            <HouseFloor />
            <FirstFloor />
          </div>
        </main>
      </div>
    </div>
  );
}
