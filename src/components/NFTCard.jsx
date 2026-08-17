function rarityClass(rarity) {
  const key = String(rarity || "").toLowerCase();
  if (key === "legendary") return "rarity-legendary";
  if (key === "mythic") return "rarity-mythic";
  if (key === "unique") return "rarity-unique";
  if (key === "hidden") return "rarity-hidden";
  return "";
}

function toIpfsFallback(url) {
  if (!url || typeof url !== "string") return null;
  const m = url.match(/\/ipfs\/([^/?#]+)(?:\/(.*))?$/i);
  if (!m) return null;
  const cid = m[1];
  const path = m[2] ? `/${m[2]}` : "";
  return `https://ipfs.io/ipfs/${cid}${path}`;
}

function NFTCard({ id, name, role, rarity, image }) {
  const tier = rarityClass(rarity);

  return (
    <article className={`nft-card ${tier}`}>
      <div className="nft-card-top">
        <div className="nft-id">#{id}</div>
        <span className={`badge ${tier}`}>{rarity || role || "—"}</span>
      </div>

      {image ? (
        <img
          className="nft-image"
          src={image}
          alt={name}
          loading="lazy"
          onError={(e) => {
            const el = e.currentTarget;
            const fallback = toIpfsFallback(el.src);
            if (fallback && el.src !== fallback) {
              el.src = fallback;
              return;
            }
            el.style.opacity = "0.35";
          }}
        />
      ) : null}

      <h4 className="nft-name">{name}</h4>
      <div className="nft-role">{role}</div>
    </article>
  );
}

export default NFTCard;
