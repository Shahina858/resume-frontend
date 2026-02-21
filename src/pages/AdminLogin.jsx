import { useState } from "react";
import { loginAdmin } from "../services/authService";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await loginAdmin(username, password);
            login({ ...data.user, role: "admin" }); // User data from backend usually contains role
            navigate("/admin");
        } catch (err) {
            setError(err.response?.data?.message || "Admin Login failed");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-900 px-4">
            <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-700 space-y-6">
                <div className="text-center">
                    <div className="inline-block p-3 rounded-full bg-indigo-500/10 mb-4 border border-indigo-500/20">
                        <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Admin Console</h2>
                    <p className="mt-1 text-xs text-gray-500 font-mono">restricted access only</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-xs text-center font-mono animate-pulse">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1">Terminal.username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white font-mono text-sm transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1">Terminal.password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white font-mono text-sm transition-all"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
                >
                    AUTHENTICATE
                </button>
            </form>
        </div>
    );
}
