function rarityClass(rarity) {
  const key = String(rarity || "").toLowerCase();
  if (key === "legendary") return "rarity-legendary";
  if (key === "mythic") return "rarity-mythic";
  if (key === "unique") return "rarity-unique";
  if (key === "hidden") return "rarity-hidden";
  return "";
}

const IPFS_GATEWAYS = [
  "https://gateway.pinata.cloud/ipfs",
  "https://ipfs.io/ipfs",
  "https://dweb.link/ipfs",
  "https://nftstorage.link/ipfs",
];

function parseIpfs(url) {
  if (!url || typeof url !== "string") return null;
  const m = url.match(/\/ipfs\/([^/?#]+)(?:\/(.*))?$/i);
  if (!m) return null;
  return { cid: m[1], path: m[2] ? `/${m[2]}` : "" };
}

function gatewayUrl(gateway, cid, path) {
  return `${gateway}/${cid}${path}`;
}

function nextGatewayUrl(currentSrc) {
  const parsed = parseIpfs(currentSrc);
  if (!parsed) return null;
  const currentIndex = IPFS_GATEWAYS.findIndex((g) =>
    currentSrc.startsWith(`${g}/`)
  );
  const next = IPFS_GATEWAYS[currentIndex + 1];
  if (!next) return null;
  return gatewayUrl(next, parsed.cid, parsed.path);
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
            const fallback = nextGatewayUrl(el.src);
            if (fallback) {
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
