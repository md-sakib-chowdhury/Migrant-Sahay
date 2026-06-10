export default function Pagination({ page, pages, onPageChange }) {
    if (pages <= 1) return null;
    return (
        <div className="pagination">
            <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>‹ আগে</button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button key={p} className={page === p ? "active" : ""} onClick={() => onPageChange(p)}>
                    {p}
                </button>
            ))}
            <button disabled={page === pages} onClick={() => onPageChange(page + 1)}>পরে ›</button>
        </div>
    );
}