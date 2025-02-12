"use client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CityBuilder } from "./components/CityBuilder";

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

