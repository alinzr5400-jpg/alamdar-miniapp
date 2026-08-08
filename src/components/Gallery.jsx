import { useEffect, useState } from "react";
import NFTCard from "./NFTCard";
import { fetchGallery } from "../services/api";
import { useSale } from "../context/SaleContext";

function Gallery() {
  const sale = useSale();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    fetchGallery(6)
      .then((data) => {
        if (!alive) return;
        setItems(data.items || []);
        setError(null);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "خطا در گالری");
      });
    return () => {
      alive = false;
    };
  }, [sale.reveal]);

  return (
    <section className="glass gallery">
      <div className="gallery-head">
        <div>
          <h3>گالری کارت‌ها</h3>
          <p>
            {sale.reveal
              ? "متادیتای واقعی از بک‌اند خوانده می‌شود."
              : "قبل از Reveal تصاویر مخفی نمایش داده می‌شوند."}
          </p>
        </div>
        <span className="badge">
          {sale.reveal ? "Revealed" : "Locked Gallery"}
        </span>
      </div>

      {error && <p className="countdown-text">{error}</p>}

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
