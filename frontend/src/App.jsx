import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Agencies from "./pages/Agencies";
import AgencyDetail from "./pages/AgencyDetail";
import Reports from "./pages/Reports";
import Forum from "./pages/Forum";
import Remittance from "./pages/Remittance";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageAgencies from "./pages/admin/ManageAgencies";
import ManageReports from "./pages/admin/ManageReports";
import ManagePosts from "./pages/admin/ManagePosts";
import ManageJobInfo from "./pages/admin/ManageJobInfo";

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" />;
    if (user.role !== "admin") return <Navigate to="/" />;
    return children;
};

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes with Navbar */}
                <Route
                    path="/*"
                    element={
                        <>
                            <Navbar />
                            <div className="container" style={{ paddingTop: 24 }}>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/agencies" element={<Agencies />} />
                                    <Route path="/agencies/:id" element={<AgencyDetail />} />
                                    <Route path="/reports" element={<Reports />} />
                                    <Route path="/forum" element={<Forum />} />
                                    <Route path="/remittance" element={<Remittance />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                </Routes>
                            </div>
                            <Footer />
                        </>
                    }
                />
                {/* Admin routes — no Navbar, no Footer */}
                <Route
                    path="/admin/*"
                    element={
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route path="users" element={<ManageUsers />} />
                    <Route path="agencies" element={<ManageAgencies />} />
                    <Route path="reports" element={<ManageReports />} />
                    <Route path="posts" element={<ManagePosts />} />
                    <Route path="jobs" element={<ManageJobInfo />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}