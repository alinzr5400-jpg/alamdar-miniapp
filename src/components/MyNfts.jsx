import { useEffect, useState } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import { useWalletContext } from "../context/WalletContext";
import { useSale } from "../context/SaleContext";
import { fetchWalletHoldings } from "../services/api";
import NFTCard from "./NFTCard";

function MyNfts() {
  const { connected } = useWalletContext();
  const buyerAddress = useTonAddress();
  const sale = useSale();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!connected || !buyerAddress) {
      setData(null);
      return;
    }

    let alive = true;
    setLoading(true);
    fetchWalletHoldings(buyerAddress)
      .then((res) => {
        if (!alive) return;
        setData(res);
        setError(null);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err instanceof Error ? err.message : "خطا در خواندن NFTها");
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [connected, buyerAddress, sale.minted, sale.reveal]);

  if (!connected) {
    return (
      <section className="glass gallery">
        <div className="gallery-head">
          <div>
            <h3>NFTهای من</h3>
            <p>برای دیدن دارایی‌ها کیف پول را وصل کنید.</p>
          </div>
        </div>
      </section>
    );
  }

  const completeSets =
    data?.legendaryProgress?.filter((p) => p.complete)?.length ?? 0;

  return (
    <section className="glass gallery">
      <div className="gallery-head">
        <div>
          <h3>NFTهای من</h3>
          <p>
            فقط NFTهای همین کیف پول (از زنجیره)
            {data ? ` — تعداد: ${data.count}` : ""}.
            {completeSets > 0
              ? ` ست کامل Legendary: ${completeSets}`
              : ""}
          </p>
        </div>
        <span className="badge">{data?.count ?? 0} NFT</span>
      </div>

      {loading && <p className="countdown-text">در حال خواندن کیف پول…</p>}
      {error && <p className="countdown-text">{error}</p>}

      {!loading && data?.items?.length === 0 && (
        <p className="countdown-text">هنوز NFTای از این کالکشن در کیف پول نیست.</p>
      )}

      <div className="grid">
        {(data?.items || []).slice(0, 12).map((item) => (
          <NFTCard
            key={item.tokenId}
            id={item.tokenId}
            name={item.name || `Alamdar #${item.tokenId}`}
            role={item.rarity || (sale.reveal ? "—" : "Hidden")}
            rarity={item.rarity || (sale.reveal ? "—" : "Hidden")}
            image={item.image || sale.hiddenImage}
          />
        ))}
      </div>

      {data?.legendaryProgress?.some((p) => p.owned.length > 0) && (
        <div style={{ marginTop: 16 }}>
          <p className="buy-label">پیشرفت Legendary (برای جایزه بعدی)</p>
          <ul className="rules-list">
            {data.legendaryProgress
              .filter((p) => p.owned.length > 0 || p.complete)
              .map((p) => (
                <li key={p.personId}>
                  شخص {p.personId}: {p.owned.length}/{p.required.length}
                  {p.complete ? " — کامل ✓" : ""}
                </li>
              ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default MyNfts;
