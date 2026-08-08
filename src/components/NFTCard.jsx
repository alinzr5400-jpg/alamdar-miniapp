function NFTCard({ id, name, role, rarity, image }) {
  return (
    <article className="nft-card">
      <div className="nft-card-top">
        <div className="nft-id">#{id}</div>
        <span className="badge">{rarity}</span>
      </div>

      {image ? (
        <img className="nft-image" src={image} alt={name} loading="lazy" />
      ) : null}

      <h4 className="nft-name">{name}</h4>
      <div className="nft-role">{role}</div>
    </article>
  );
}

export default NFTCard;
