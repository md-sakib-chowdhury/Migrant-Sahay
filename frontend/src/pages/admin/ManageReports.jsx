import { useEffect, useState } from "react";
import { fetchAdminReports, updateReport, deleteReport } from "../../api/adminApi";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";

const statusColors = {
    pending: "badge-yellow",
    investigating: "badge-blue",
    resolved: "badge-green",
    rejected: "badge-red",
};

export default function ManageReports() {
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [statusFilter, setStatusFilter] = useState("");
    const [modal, setModal] = useState(null);
    const [adminNote, setAdminNote] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [loading, setLoading] = useState(true);

    const load = async (p = 1) => {
        setLoading(true);
        try {
            const res = await fetchAdminReports({ page: p, limit: 10, status: statusFilter });
            setReports(res.data.reports);
            setTotal(res.data.total);
            setPages(res.data.pages);
            setPage(p);
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, [statusFilter]);

    const openModal = (r) => {
        setModal(r);
        setAdminNote(r.adminNote || "");
        setNewStatus(r.status);
    };

    const handleUpdate = async () => {
        try {
            await updateReport(modal._id, { status: newStatus, adminNote });
            toast.success("আপডেট হয়েছে");
            setModal(null);
            load(page);
        } catch { toast.error("ব্যর্থ"); }
    };

    const handleDelete = async (id) => {
        if (!confirm("মুছতে চান?")) return;
        try {
            await deleteReport(id);
            toast.success("মুছে ফেলা হয়েছে");
            load(page);
        } catch { toast.error("ব্যর্থ"); }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>🚨 অভিযোগ ম্যানেজমেন্ট ({total})</h1>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: "8px 12px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14 }}>
                    <option value="">সব</option>
                    <option value="pending">পেন্ডিং</option>
                    <option value="investigating">তদন্তাধীন</option>
                    <option value="resolved">সমাধান</option>
                    <option value="rejected">প্রত্যাখ্যাত</option>
                </select>
            </div>

            {loading ? <p>লোড হচ্ছে...</p> : (
                <div className="card" style={{ padding: 0 }}>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr><th>এজেন্সি</th><th>ইউজার</th><th>দেশ</th><th>পরিমাণ</th><th>স্ট্যাটাস</th><th>Upvote</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                {reports.map((r) => (
                                    <tr key={r._id}>
                                        <td>{r.agencyName}</td>
                                        <td>{r.user?.name}</td>
                                        <td>{r.country || "—"}</td>
                                        <td>{r.amount ? `৳${r.amount}` : "—"}</td>
                                        <td><span className={`badge ${statusColors[r.status]}`}>{r.status}</span></td>
                                        <td>{r.upvotes.length}</td>
                                        <td style={{ display: "flex", gap: 6 }}>
                                            <button className="btn btn-sm btn-warning" onClick={() => openModal(r)}>পর্যালোচনা</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r._id)}>মুছুন</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination page={page} pages={pages} onPageChange={load} />
                </div>
            )}

            {modal && (
                <div className="modal-overlay" onClick={() => setModal(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>অভিযোগ পর্যালোচনা</h2>
                        <div className="card" style={{ background: "#f9fafb", marginBottom: 16 }}>
                            <p><b>এজেন্সি:</b> {modal.agencyName}</p>
                            <p style={{ marginTop: 8 }}><b>বিবরণ:</b> {modal.description}</p>
                        </div>
                        <div className="form-group">
                            <label>স্ট্যাটাস পরিবর্তন</label>
                            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                <option value="pending">পেন্ডিং</option>
                                <option value="investigating">তদন্তাধীন</option>
                                <option value="resolved">সমাধান</option>
                                <option value="rejected">প্রত্যাখ্যাত</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Admin নোট</label>
                            <textarea rows={3} value={adminNote} onChange={(e) => setAdminNote(e.target.value)} />
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="btn btn-primary" onClick={handleUpdate}>সংরক্ষণ</button>
                            <button className="btn" style={{ background: "#e5e7eb" }} onClick={() => setModal(null)}>বাতিল</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}