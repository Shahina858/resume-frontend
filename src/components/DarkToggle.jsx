export default function DarkToggle() {
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleDark}
      className="px-3 py-1 bg-indigo-500 text-white rounded"
    >
      🌙
    </button>
  );
}
