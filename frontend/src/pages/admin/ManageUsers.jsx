import { useEffect, useState } from "react";
import { fetchUsers, updateUser, deleteUser } from "../../api/adminApi";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";

export default function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const load = async (p = 1) => {
        setLoading(true);
        try {
            const res = await fetchUsers({ page: p, limit: 10, search });
            setUsers(res.data.users);
            setTotal(res.data.total);
            setPages(res.data.pages);
            setPage(p);
        } catch {
            toast.error("লোড করতে সমস্যা");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleRoleToggle = async (user) => {
        const newRole = user.role === "admin" ? "user" : "admin";
        try {
            await updateUser(user._id, { role: newRole });
            toast.success("Role পরিবর্তন হয়েছে");
            load(page);
        } catch { toast.error("ব্যর্থ"); }
    };

    const handleToggleActive = async (user) => {
        try {
            await updateUser(user._id, { isActive: !user.isActive });
            toast.success(user.isActive ? "নিষ্ক্রিয় করা হয়েছে" : "সক্রিয় করা হয়েছে");
            load(page);
        } catch { toast.error("ব্যর্থ"); }
    };

    const handleDelete = async (id) => {
        if (!confirm("নিশ্চিতভাবে মুছতে চান?")) return;
        try {
            await deleteUser(id);
            toast.success("মুছে ফেলা হয়েছে");
            load(page);
        } catch { toast.error("ব্যর্থ"); }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>👥 ইউজার ম্যানেজমেন্ট ({total})</h1>
                <div style={{ display: "flex", gap: 8 }}>
                    <input
                        placeholder="নাম / ইমেইল খুঁজুন..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && load(1)}
                        style={{ padding: "8px 12px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14 }}
                    />
                    <button className="btn btn-primary btn-sm" onClick={() => load(1)}>খুঁজুন</button>
                </div>
            </div>

            {loading ? <p>লোড হচ্ছে...</p> : (
                <div className="card" style={{ padding: 0 }}>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>নাম</th>
                                    <th>ইমেইল</th>
                                    <th>দেশ</th>
                                    <th>Role</th>
                                    <th>স্ট্যাটাস</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.country || "—"}</td>
                                        <td>
                                            <span className={`badge ${u.role === "admin" ? "badge-blue" : "badge-green"}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge ${u.isActive ? "badge-green" : "badge-red"}`}>
                                                {u.isActive ? "সক্রিয়" : "নিষ্ক্রিয়"}
                                            </span>
                                        </td>
                                        <td style={{ display: "flex", gap: 6 }}>
                                            <button className="btn btn-sm btn-warning" onClick={() => handleRoleToggle(u)}>
                                                {u.role === "admin" ? "User করো" : "Admin করো"}
                                            </button>
                                            <button className="btn btn-sm" style={{ background: u.isActive ? "#6b7280" : "#16a34a", color: "#fff" }} onClick={() => handleToggleActive(u)}>
                                                {u.isActive ? "বন্ধ করো" : "চালু করো"}
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u._id)}>মুছুন</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination page={page} pages={pages} onPageChange={load} />
                </div>
            )}
        </div>
    );
}