import { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import { fetchGallery } from "../services/api";
import { useSale } from "../context/SaleContext";

function Gallery() {
  const sale = useSale();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    const limit = Math.min(
      Math.max(Number(sale.minted) || 6, 2),
      12
    );

    fetchGallery(limit)
      .then((data) => {
        if (!alive) return;
        setItems(data.items || []);
        setError(null);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "خطا در گالری");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [sale.reveal, sale.minted]);

  return (
    <section className="glass gallery">
      <div className="gallery-head">
        <div>
          <h3>گالری کارت‌ها</h3>
          <p>
            {sale.reveal
              ? "کارت‌های مینت‌شده با رریته و تصویر واقعی نمایش داده می‌شوند."
              : "قبل از Reveal فقط تصویر مخفی نشان داده می‌شود."}
          </p>
        </div>
        <span className={`badge ${sale.reveal ? "badge-reveal-on" : "badge-reveal-off"}`}>
          {sale.reveal ? "Reveal فعال" : "قفل تا Reveal"}
        </span>
      </div>

      {error && <p className="countdown-text">{error}</p>}
      {loading && <p className="countdown-text">در حال بارگذاری گالری…</p>}

      {!loading && items.length === 0 && (
        <p className="countdown-text">هنوز کارتی برای نمایش نیست.</p>
      )}

      <div className="grid">
        {items.map((card) => (
          <NFTCard
            key={card.id}
            id={card.id}
            name={card.name}
            role={card.role}
            rarity={card.rarity}
            image={card.image}
          />
        ))}
      </div>
    </section>
  );
}

export default Gallery;
