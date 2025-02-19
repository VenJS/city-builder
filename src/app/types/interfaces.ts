export interface House {
    houseName: string;
    floors: number;
    color: string;
  }

  export interface DraggableHouseProps {
    house: House;
    index: number;
    moveHouse: (fromIndex: number, toIndex: number) => void;
  }

  export interface WeatherData {
    current_weather: {
      temperature: number;
      weathercode: number;
    };
  }

  export interface HeaderProps {
    isLoading: boolean;
    error: Error | null;
    data?: WeatherData;
  }

  export interface SideBarProps {
    houses: House[];
    setHouses: React.Dispatch<React.SetStateAction<House[]>>;
  }

  export interface HouseItemProps {
    house: {
      houseName: string;
      floors: number;
      color: string;
    };
    index: number;
    updateHouseName: (index: number, value: string) => void;
    updateFloors: (index: number, value: number) => void;
    updateColor: (index: number, value: string) => void;
    removeHouse: (index: number) => void;
  }