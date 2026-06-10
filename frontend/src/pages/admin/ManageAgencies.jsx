import { useEffect, useState } from "react";
import { fetchAdminAgencies, createAgency, updateAgency, deleteAgency } from "../../api/adminApi";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";

const empty = {
    name: "", licenseNo: "", address: "", phone: "", email: "",
    countries: "", description: "", isVerified: false, isActive: true,
};

export default function ManageAgencies() {
    const [agencies, setAgencies] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [loading, setLoading] = useState(true);

    const load = async (p = 1) => {
        setLoading(true);
        try {
            const res = await fetchAdminAgencies({ page: p, limit: 10, search });
            setAgencies(res.data.agencies);
            setTotal(res.data.total);
            setPages(res.data.pages);
            setPage(p);
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const openCreate = () => { setEditing(null); setForm(empty); setModal(true); };
    const openEdit = (a) => {
        setEditing(a._id);
        setForm({ ...a, countries: a.countries.join(", ") });
        setModal(true);
    };

    const handleSubmit = async () => {
        const payload = { ...form, countries: form.countries.split(",").map((c) => c.trim()) };
        try {
            if (editing) {
                await updateAgency(editing, payload);
                toast.success("আপডেট হয়েছে");
            } else {
                await createAgency(payload);
                toast.success("এজেন্সি যোগ হয়েছে");
            }
            setModal(false);
            load(page);
        } catch (err) {
            toast.error(err.response?.data?.message || "ব্যর্থ");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("নিশ্চিতভাবে মুছতে চান?")) return;
        try {
            await deleteAgency(id);
            toast.success("মুছে ফেলা হয়েছে");
            load(page);
        } catch { toast.error("ব্যর্থ"); }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>🏢 এজেন্সি ম্যানেজমেন্ট ({total})</h1>
                <div style={{ display: "flex", gap: 8 }}>
                    <input placeholder="নাম খুঁজুন..." value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && load(1)}
                        style={{ padding: "8px 12px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14 }} />
                    <button className="btn btn-primary btn-sm" onClick={() => load(1)}>খুঁজুন</button>
                    <button className="btn btn-success btn-sm" onClick={openCreate}>+ নতুন এজেন্সি</button>
                </div>
            </div>

            {loading ? <p>লোড হচ্ছে...</p> : (
                <div className="card" style={{ padding: 0 }}>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>নাম</th><th>লাইসেন্স</th><th>দেশ</th><th>ভেরিফাইড</th><th>স্ট্যাটাস</th><th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agencies.map((a) => (
                                    <tr key={a._id}>
                                        <td>{a.name}</td>
                                        <td>{a.licenseNo}</td>
                                        <td>{a.countries.join(", ")}</td>
                                        <td><span className={`badge ${a.isVerified ? "badge-green" : "badge-yellow"}`}>{a.isVerified ? "হ্যাঁ" : "না"}</span></td>
                                        <td><span className={`badge ${a.isActive ? "badge-green" : "badge-red"}`}>{a.isActive ? "সক্রিয়" : "বন্ধ"}</span></td>
                                        <td style={{ display: "flex", gap: 6 }}>
                                            <button className="btn btn-sm btn-warning" onClick={() => openEdit(a)}>সম্পাদনা</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a._id)}>মুছুন</button>
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
                <div className="modal-overlay" onClick={() => setModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2>{editing ? "এজেন্সি সম্পাদনা" : "নতুন এজেন্সি"}</h2>
                        {[
                            ["name", "নাম *"],
                            ["licenseNo", "লাইসেন্স নং *"],
                            ["address", "ঠিকানা *"],
                            ["phone", "ফোন *"],
                            ["email", "ইমেইল"],
                            ["countries", "দেশ (কমা দিয়ে আলাদা করুন)"],
                            ["description", "বিবরণ"],
                        ].map(([key, label]) => (
                            <div className="form-group" key={key}>
                                <label>{label}</label>
                                <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                            </div>
                        ))}
                        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                            <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
                                <input type="checkbox" checked={form.isVerified}
                                    onChange={(e) => setForm({ ...form, isVerified: e.target.checked })} />
                                ভেরিফাইড
                            </label>
                            <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
                                <input type="checkbox" checked={form.isActive}
                                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                                সক্রিয়
                            </label>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="btn btn-primary" onClick={handleSubmit}>সংরক্ষণ করুন</button>
                            <button className="btn" style={{ background: "#e5e7eb" }} onClick={() => setModal(false)}>বাতিল</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}