export default function ResumePreview({ text }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg h-[400px] overflow-y-auto text-sm border">
      <pre className="whitespace-pre-wrap leading-relaxed">
        {text || "No resume text available"}
      </pre>
    </div>
  );
}