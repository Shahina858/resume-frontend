export default function SkillGapTable({ skills }) {
  return (
    <table className="w-full bg-white dark:bg-gray-800 rounded shadow">
      <thead className="bg-indigo-100 dark:bg-gray-700">
        <tr>
          <th className="p-2 text-left">Missing Skill</th>
          <th className="p-2 text-left">Priority</th>
        </tr>
      </thead>
      <tbody>
        {skills.map((skill, i) => (
          <tr key={i} className="border-t">
            <td className="p-2">{skill}</td>
            <td className="p-2 text-red-500">High</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
