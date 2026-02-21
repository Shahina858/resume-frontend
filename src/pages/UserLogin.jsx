import { useState } from "react";
import { loginUser } from "../services/authService";
import useAuthStore from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";

export default function UserLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const data = await loginUser(email, password);
            login(data.user);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
            <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Please enter your details to sign in</p>
                </div>

                {error && <p className="bg-red-50 dark:bg-red-900/30 text-red-500 p-3 rounded-lg text-sm text-center border border-red-100 dark:border-red-900/50">{error}</p>}

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none transition-all transform hover:-translate-y-0.5"
                >
                    Sign In
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Sign up</Link>
                </p>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
                    <Link to="/admin/login" className="text-xs text-gray-400 hover:text-indigo-500 transition-colors">Admin Login</Link>
                </div>
            </form>
        </div>
    );
}
