import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminCareerPivots() {
  const [pivots, setPivots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPivots();
  }, []);

  const fetchPivots = async () => {
    try {
      const res = await api.get("/career/pivot");
      setPivots(res.data);
    } catch (err) {
      console.error("Failed to load career pivots ❌", err);
    } finally {
      setLoading(false);
    }
  };

  const approvePivot = async (id) => {
    try {
      await api.patch(`/career/pivot/${id}/approve`);
      fetchPivots();
    } catch (err) {
      console.error("Approval failed ❌", err);
    }
  };

  if (loading) {
    return <div className="p-6">Loading career pivots...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Career Pivot Approvals</h1>

      {pivots.length === 0 ? (
        <p className="text-gray-500">No career pivots submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {pivots.map((pivot) => (
            <div
              key={pivot._id}
              className="bg-white dark:bg-gray-800 p-5 rounded shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">
                    {pivot.fromRole} → {pivot.toRole}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Required Skills: {pivot.requiredSkills.join(", ")}
                  </p>
                </div>

                {pivot.approved ? (
                  <span className="text-green-600 text-sm font-semibold">
                    Approved
                  </span>
                ) : (
                  <button
                    onClick={() => approvePivot(pivot._id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded text-sm"
                  >
                    Approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}