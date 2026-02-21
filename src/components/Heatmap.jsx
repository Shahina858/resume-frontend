import { useEffect, useState } from "react";
import api from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function Heatmap() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchHeatmap = async () => {
      try {
        const res = await api.get("/admin/analytics/skills");
        const skills = res.data || [];

        setChartData({
          labels: skills.map((s) => s.skill),
          datasets: [
            {
              label: "Skill Demand",
              data: skills.map((s) => s.count),
              backgroundColor: "#6366f1",
            },
          ],
        });
      } catch (err) {
        console.error("FAILED TO LOAD HEATMAP DATA", err);
      }
    };

    fetchHeatmap();
  }, []);

  if (!chartData) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <p className="text-sm text-gray-500">Loading skill analytics...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="font-semibold text-gray-800 dark:text-white mb-4">
        Skill Demand Heatmap
      </h2>
      <Bar data={chartData} />
    </div>
  );
}