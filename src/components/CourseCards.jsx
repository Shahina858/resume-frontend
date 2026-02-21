export default function CourseCards({ courses }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {courses.map((c, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:scale-105 transition"
        >
          <p className="font-semibold">{c.skill}</p>
          <p className="text-sm text-gray-500">{c.course}</p>
        </div>
      ))}
    </div>
  );
}
