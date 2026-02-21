import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminUserView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("FAILED TO FETCH USERS", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = async (userId) => {
    const confirm = window.confirm(
      "Are you sure you want to activate/deactivate this user?"
    );
    if (!confirm) return;

    try {
      const res = await api.patch(`/admin/users/${userId}/toggle`);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId ? res.data.user : u
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading users...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Registered Users</h1>
        <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-xs font-bold">
          Total: {users.length}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase">User</th>
              <th className="px-6 py-4 text-xs font-bold uppercase">Role</th>
              <th className="px-6 py-4 text-xs font-bold uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {user.isActive ? "Active" : "Deactivated"}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => toggleUser(user._id)}
                      className={`px-3 py-1 rounded text-xs font-bold ${
                        user.isActive
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            No users found
          </div>
        )}
      </div>
    </div>
  );
}