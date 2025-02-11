"use client";
import { FirstFloor, HouseFloor, Roof } from "./assets/assets";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";


const colorOptions = [
  { name: "Orange", value: "#FFA500" },
  { name: "Alizarin", value: "#E74C3C" },
  { name: "Belize", value: "#2980B9" },
  { name: "Emerald", value: "#2ECC71" },
];

const fetchWeather = async ({ queryKey }: { queryKey: [string, number, number] }) => {
  const [, latitude, longitude] = queryKey;
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

const queryClient = new QueryClient();


export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CityBuilder />
    </QueryClientProvider>
  );
}

 function CityBuilder() {
  const [houses, setHouses] = useState([
    { houseName: "House 1", floors: 3, color: "#FFA500" }
  ]);
  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null });


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location", error);
      }
    );
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: location.latitude !== null && location.longitude !== null ? ["weather", location.latitude, location.longitude] : ["weather", 0, 0],
    queryFn: fetchWeather,
    enabled: location.latitude !== null && location.longitude !== null,
  });

  const addNewHouse = () => {
    setHouses([...houses, { houseName: `House ${houses.length + 1}`, floors: 3, color: "#FFA500" }]);
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

  const updateHouseName = (index:number, value: string) => {
    const updatedHouses = houses.map((house, i) =>
      i === index ? { ...house, houseName: value } : house
    );
    setHouses(updatedHouses);
  };

  console.log({data})
  return (
    <div className="min-h-screen">
      <header className="bg-gray-100 mb-5 shadow-md p-4 text-red-600 text-2xl font-bold">
        City Builder

        <div>
          {isLoading && <p>Loading weather...</p>}
          {error && <p>Error loading weather</p>}
          {data && (
            <div className="flex items-center gap-2">
              <span>{data.current_weather.temperature}°C</span>
              {data.current_weather.weathercode < 3 ? "☀️" : data.current_weather.weathercode < 6 ? "🌧️" : "❄️"}
            </div>
          )}
        </div>
      </header>

      <div className="flex">
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

        <main className="flex-1 p-6 flex flex-wrap gap-8 justify-center">
          {houses.map((house, index) => (
            <div key={index} className="flex flex-col items-center">
              <Roof />
              {[...Array(house.floors - 1)].map((_, i) => (
                <HouseFloor key={i} color={house.color} />
              ))}
              <FirstFloor color={house.color} />
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
