export default function AnalysisCard({ title, items }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-indigo-500 font-bold">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}