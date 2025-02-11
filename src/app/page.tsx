import { FirstFloor, HouseFloor, Roof } from "./assets/assets";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-gray-100 mb-5 shadow-md p-4 text-red-600 text-2xl font-bold">
        City Builder
      </header>

      <div className="flex">
        <aside className="w-1/4 bg-gray-100 p-4 shadow-md min-h-screen">
          <h2 className="text-lg font-semibold">Houses List</h2>
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
