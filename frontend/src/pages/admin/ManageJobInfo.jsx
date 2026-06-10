import { useEffect, useState } from "react";
import { fetchAdminJobs, createJob, updateJob, deleteJob } from "../../api/adminApi";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";

const empty = {
    country: "", jobTitle: "", minSalary: "", maxSalary: "",
    currency: "BDT", workingHours: "8 hours/day", visaType: "Work Visa",
    requirements: "", benefits: "", category: "other", isActive: true,
};

export default function ManageJobInfo() {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [modal, setModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(empty);
    const [loading, setLoading] = useState(true);

    const load = async (p = 1) => {
        setLoading(true);
        try {
            const res = await fetchAdminJobs({ page: p, limit: 10 });
            setJobs(res.data.jobs);
            setTotal(res.data.total);
            setPages(res.data.pages);
            setPage(p);
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const openCreate = () => { setEditing(null); setForm(empty); setModal(true); };
    const openEdit = (j) => {
        setEditing(j._id);
        setForm({ ...j, requirements: j.requirements.join(", "), benefits: j.benefits.join(", ") });
        setModal(true);
    };

    const handleSubmit = async () => {
        const payload = {
            ...form,
            minSalary: Number(form.minSalary),
            maxSalary: Number(form.maxSalary),
            requirements: form.requirements.split(",").map((s) => s.trim()).filter(Boolean),
            benefits: form.benefits.split(",").map((s) => s.trim()).filter(Boolean),
        };
        try {
            if (editing) {
                await updateJob(editing, payload);
                toast.success("আপডেট হয়েছে");
            } else {
                await createJob(payload);
                toast.success("যোগ হয়েছে");
            }
            setModal(false);
            load(page);
        } catch (err) {
            toast.error(err.response?.data?.message || "ব্যর্থ");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("মুছতে চান?")) return;
        try {
            await deleteJob(id);
            toast.success("মুছে ফেলা হয়েছে");
            load(page);
        } catch { toast.error("ব্যর্থ"); }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>💼 চাকরি তথ্য ম্যানেজমেন্ট ({total})</h1>
                <button className="btn btn-success btn-sm" onClick={openCreate}>+ নতুন চাকরি তথ্য</button>
            </div>

            {loading ? <p>লোড হচ্ছে...</p> : (
                <div className="card" style={{ padding: 0 }}>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr><th>দেশ</th><th>পদ</th><th>বেতন</th><th>ক্যাটাগরি</th><th>স্ট্যাটাস</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                {jobs.map((j) => (
                                    <tr key={j._id}>
                                        <td>{j.country}</td>
                                        <td>{j.jobTitle}</td>
                                        <td>{j.minSalary}–{j.maxSalary} {j.currency}</td>
                                        <td><span className="badge badge-blue">{j.category}</span></td>
                                        <td><span className={`badge ${j.isActive ? "badge-green" : "badge-red"}`}>{j.isActive ? "সক্রিয়" : "বন্ধ"}</span></td>
                                        <td style={{ display: "flex", gap: 6 }}>
                                            <button className="btn btn-sm btn-warning" onClick={() => openEdit(j)}>সম্পাদনা</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(j._id)}>মুছুন</button>
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
                        <h2>{editing ? "চাকরি তথ্য সম্পাদনা" : "নতুন চাকরি তথ্য"}</h2>
                        {[
                            ["country", "দেশ *"],
                            ["jobTitle", "পদের নাম *"],
                            ["minSalary", "সর্বনিম্ন বেতন *"],
                            ["maxSalary", "সর্বোচ্চ বেতন *"],
                            ["currency", "মুদ্রা"],
                            ["workingHours", "কাজের সময়"],
                            ["visaType", "ভিসার ধরন"],
                            ["requirements", "প্রয়োজনীয়তা (কমা দিয়ে)"],
                            ["benefits", "সুবিধা (কমা দিয়ে)"],
                        ].map(([key, label]) => (
                            <div className="form-group" key={key}>
                                <label>{label}</label>
                                <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
                            </div>
                        ))}
                        <div className="form-group">
                            <label>ক্যাটাগরি</label>
                            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                                {["construction", "domestic", "hospitality", "manufacturing", "healthcare", "other"].map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer", marginBottom: 16 }}>
                            <input type="checkbox" checked={form.isActive}
                                onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                            সক্রিয়
                        </label>
                        <div style={{ display: "flex", gap: 8 }}>
                            <button className="btn btn-primary" onClick={handleSubmit}>সংরক্ষণ</button>
                            <button className="btn" style={{ background: "#e5e7eb" }} onClick={() => setModal(false)}>বাতিল</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}