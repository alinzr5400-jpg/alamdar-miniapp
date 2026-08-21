import { useEffect, useMemo, useState } from "react";
import { fetchMartyrs } from "../services/api";

function Martyrs() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchMartyrs()
      .then((data) => {
        if (!alive) return;
        setItems(data.items || []);
        setError(null);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "خطا در بارگذاری یادبود");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.summary.toLowerCase().includes(q) ||
        String(m.id) === q
    );
  }, [items, query]);

  return (
    <section className="glass gallery martyrs-section" id="martyrs">
      <div className="gallery-head">
        <div>
          <h3>یادبود شهدا</h3>
          <p>نام و یک خط روایت برای ۱۱۴ شهید مجموعه علمدار.</p>
        </div>
        <span className="badge">{items.length || 114}</span>
      </div>

      <label className="martyrs-search">
        <span className="sr-only">جستجوی شهید</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو نام یا روایت…"
          autoComplete="off"
        />
      </label>

      {error && <p className="countdown-text">{error}</p>}
      {loading && <p className="countdown-text">در حال بارگذاری…</p>}

      {!loading && (
        <ul className="martyrs-list">
          {filtered.map((m) => (
            <li key={m.id} className="martyr-row" id={`martyr-${m.id}`}>
              <span className="martyr-id">{m.id}</span>
              <div>
                <strong>{m.name}</strong>
                <p>{m.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {!loading && filtered.length === 0 && (
        <p className="countdown-text">موردی یافت نشد.</p>
      )}
    </section>
  );
}

export default Martyrs;
