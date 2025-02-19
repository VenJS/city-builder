import { useEffect, useState } from "react";
import { House } from "../types/interfaces";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import SideBar from "./SideBar";
import { DraggableHouse } from "./DraggableHouse";
import { fetchWeather, saveToLocalStorage } from "../utils";

export function CityBuilder() {
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

  const moveHouse = (fromIndex: number, toIndex: number): void => {
    setHouses((prevHouses) => {
      const updatedHouses = [...prevHouses];
      const [movedHouse] = updatedHouses.splice(fromIndex, 1);
      updatedHouses.splice(toIndex, 0, movedHouse);
      saveToLocalStorage(updatedHouses);
      return updatedHouses;
    });
  };

  return (
    <div className="min-h-screen">
      <Header isLoading={isLoading} error={error} data={data} />

      <div className="flex">
        <SideBar houses={houses} setHouses={setHouses} />

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
