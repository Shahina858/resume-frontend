import DarkToggle from "./DarkToggle";

export default function Navbar() {
  return (
    <div className="h-14 bg-white dark:bg-gray-900 shadow flex items-center justify-between px-6">
      <h1 className="font-bold text-indigo-600">
        AI Resume Career Platform
      </h1>
      <DarkToggle />
    </div>
  );
}
