"use client";
import { useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DraggableHouse } from "./components/DraggableHouse";
import { House } from "./types/interfaces";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

const fetchWeather = async ({
  queryKey,
}: {
  queryKey: [string, number, number];
}) => {
  const [, latitude, longitude] = queryKey;
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <QueryClientProvider client={queryClient}>
        <CityBuilder />
      </QueryClientProvider>
    </DndProvider>
  );
}

function CityBuilder() {
  const [houses, setHouses] = useState<House[]>(() => {
    const savedHouses = localStorage.getItem("houses");
    return savedHouses
      ? JSON.parse(savedHouses)
      : [{ houseName: "House 1", floors: 3, color: "#FFA500" }];
  });
  const [location, setLocation] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

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
    queryKey:
      location.latitude !== null && location.longitude !== null
        ? ["weather", location.latitude, location.longitude]
        : ["weather", 0, 0],
    queryFn: fetchWeather,
    enabled: location.latitude !== null && location.longitude !== null,
  });

  const saveToLocalStorage = (houses: House[]) => {
    localStorage.setItem("houses", JSON.stringify(houses));
  };

  const moveHouse = (fromIndex: number, toIndex: number): void => {
    setHouses((prevHouses) => {
      const updatedHouses = [...prevHouses];
      const [movedHouse] = updatedHouses.splice(fromIndex, 1);
      updatedHouses.splice(toIndex, 0, movedHouse);
      saveToLocalStorage(updatedHouses);
      return updatedHouses;
    });
  };

  

  console.log({ houses });
  console.log({ data });
  return (
    <div className="min-h-screen">
      <Header isLoading={isLoading} error={error} data={data} />

      <div className="flex">
        <SideBar houses={houses} setHouses={setHouses}/>

        <main className="flex-1 p-6 grid grid-cols-4 gap-10 justify-center auto-rows-min">
          {houses.map((house, index) => (
            <DraggableHouse
              key={index}
              house={house}
              index={index}
              moveHouse={moveHouse}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
