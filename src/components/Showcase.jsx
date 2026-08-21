import { useEffect, useState } from "react";
import { fetchShowcase } from "../services/api";

const IPFS_GATEWAYS = [
  "https://gateway.pinata.cloud/ipfs",
  "https://ipfs.io/ipfs",
  "https://dweb.link/ipfs",
  "https://nftstorage.link/ipfs",
];

function nextGatewayUrl(currentSrc) {
  const m = String(currentSrc || "").match(/\/ipfs\/([^/?#]+)(?:\/(.*))?$/i);
  if (!m) return null;
  const cid = m[1];
  const path = m[2] ? `/${m[2]}` : "";
  const idx = IPFS_GATEWAYS.findIndex((g) => currentSrc.startsWith(`${g}/`));
  const next = IPFS_GATEWAYS[idx + 1];
  return next ? `${next}/${cid}${path}` : null;
}

function ShowcaseCard({ item }) {
  return (
    <article
      className="showcase-card"
      onContextMenu={(e) => e.preventDefault()}
      draggable={false}
    >
      <div className="showcase-media">
        {item.image ? (
          <img
            src={item.image}
            alt=""
            loading="lazy"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onError={(e) => {
              const el = e.currentTarget;
              const fallback = nextGatewayUrl(el.src);
              if (fallback) el.src = fallback;
              else el.style.opacity = "0.35";
            }}
          />
        ) : null}
        <div className="showcase-watermark" aria-hidden="true">
          ALAMDAR
        </div>
      </div>
      <div className="showcase-meta">
        <span className={`badge rarity-${String(item.rarity || "").toLowerCase()}`}>
          {item.rarity}
        </span>
        <h4>{item.name}</h4>
        {item.summary ? <p>{item.summary}</p> : null}
      </div>
    </article>
  );
}

function Showcase() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchShowcase()
      .then((data) => {
        if (!alive) return;
        setItems(data.items || []);
        setError(null);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "خطا در ویترین");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Duplicate strip for seamless horizontal marquee.
  const strip = items.length > 0 ? [...items, ...items] : [];

  return (
    <section className="glass gallery showcase-section">
      <div className="gallery-head">
        <div>
          <h3>ویترین کارت‌ها</h3>
          <p>
            چند نمونه از کارت‌های مجموعه برای آشنایی با طرح‌ها.
            خرید از بخش «خرید NFT» بالاتر انجام می‌شود.
          </p>
        </div>
        <span className="badge">Showcase</span>
      </div>

      {error && <p className="countdown-text">{error}</p>}
      {loading && <p className="countdown-text">در حال بارگذاری ویترین…</p>}

      {!loading && items.length > 0 && (
        <div className="showcase-rail" dir="ltr">
          <div className="showcase-track">
            {strip.map((item, index) => (
              <ShowcaseCard
                key={`${item.stem}-${index}`}
                item={item}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Showcase;
