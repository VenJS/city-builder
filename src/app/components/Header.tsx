import React from "react";
import { weatherIcons } from "../assets/assets";
import { HeaderProps } from "../types/interfaces";

const Header = ({ isLoading, error, data }: HeaderProps) => {
  const getWeatherIcon = (code: number): string => weatherIcons[code] || "❓";

  return (
    <header className="bg-gray-100 mb-5 shadow-md p-4 text-red-600 text-2xl font-bold flex justify-between">
      City Builder
      <div>
        {isLoading && <p>Loading weather...</p>}
        {error && <p>Error loading weather</p>}
        {data && (
          <div className="flex items-center gap-2">
            <span>
              {data.current_weather.temperature}°C{" "}
              {getWeatherIcon(data.current_weather.weathercode)}
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
