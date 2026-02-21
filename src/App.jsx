import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";


export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900">
          <Navbar />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
