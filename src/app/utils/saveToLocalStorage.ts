import { House } from "../types/interfaces";

export const saveToLocalStorage = (houses: House[]) => {
    localStorage.setItem("houses", JSON.stringify(houses));
  };