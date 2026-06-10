import { useEffect, useState } from "react";
import { fetchAdminPosts, updatePost, deletePost } from "../../api/adminApi";
import Pagination from "../../components/Pagination";
import toast from "react-hot-toast";

export default function ManagePosts() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const load = async (p = 1) => {
        setLoading(true);
        try {
            const res = await fetchAdminPosts({ page: p, limit: 10, search });
            setPosts(res.data.posts);
            setTotal(res.data.total);
            setPages(res.data.pages);
            setPage(p);
        } finally { setLoading(false); }
    };

    useEffect(() => { load(); }, []);

    const toggleActive = async (post) => {
        try {
            await updatePost(post._id, { isActive: !post.isActive });
            toast.success(post.isActive ? "পোস্ট লুকানো হয়েছে" : "পোস্ট দেখানো হচ্ছে");
            load(page);
        } catch { toast.error("ব্যর্থ"); }
    };

    const handleDelete = async (id) => {
        if (!confirm("পোস্ট মুছতে চান?")) return;
        try {
            await deletePost(id);
            toast.success("মুছে ফেলা হয়েছে");
            load(page);
        } catch { toast.error("ব্যর্থ"); }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700 }}>💬 পোস্ট ম্যানেজমেন্ট ({total})</h1>
                <div style={{ display: "flex", gap: 8 }}>
                    <input placeholder="শিরোনাম খুঁজুন..." value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && load(1)}
                        style={{ padding: "8px 12px", border: "1.5px solid #d1d5db", borderRadius: 8, fontSize: 14 }} />
                    <button className="btn btn-primary btn-sm" onClick={() => load(1)}>খুঁজুন</button>
                </div>
            </div>

            {loading ? <p>লোড হচ্ছে...</p> : (
                <div className="card" style={{ padding: 0 }}>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr><th>শিরোনাম</th><th>ইউজার</th><th>ক্যাটাগরি</th><th>Like</th><th>Comment</th><th>স্ট্যাটাস</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                {posts.map((p) => (
                                    <tr key={p._id}>
                                        <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</td>
                                        <td>{p.user?.name}</td>
                                        <td><span className="badge badge-blue">{p.category}</span></td>
                                        <td>❤️ {p.likes.length}</td>
                                        <td>💬 {p.comments.length}</td>
                                        <td><span className={`badge ${p.isActive ? "badge-green" : "badge-red"}`}>{p.isActive ? "দৃশ্যমান" : "লুকানো"}</span></td>
                                        <td style={{ display: "flex", gap: 6 }}>
                                            <button className="btn btn-sm btn-warning" onClick={() => toggleActive(p)}>
                                                {p.isActive ? "লুকাও" : "দেখাও"}
                                            </button>
                                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p._id)}>মুছুন</button>
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