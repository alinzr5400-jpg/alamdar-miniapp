import { useEffect, useState } from "react";
import { useTonConnectUI, useTonAddress } from "@tonconnect/ui-react";
import { useWalletContext } from "../context/WalletContext";
import { useSale } from "../context/SaleContext";
import { startPayment } from "../services/paymentService";
import { MIN_BUY, MAX_BUY, NFT_PRICE } from "../config/constants";

function BuySection() {
  const sale = useSale();
  const minBuy = sale.minBuy ?? MIN_BUY;
  const maxBuy = sale.maxBuy ?? MAX_BUY;
  const price = sale.mintPrice ?? NFT_PRICE;

  const [count, setCount] = useState(minBuy);
  const [busy, setBusy] = useState(false);
  const { connected } = useWalletContext();
  const [tonConnectUI] = useTonConnectUI();
  const buyerAddress = useTonAddress();

  useEffect(() => {
    setCount((current) => Math.min(Math.max(current, minBuy), maxBuy));
  }, [minBuy, maxBuy]);

  const safeCount = Math.min(Math.max(count, minBuy), maxBuy);
  const total = Number((safeCount * price).toFixed(4));
  const disabled =
    busy ||
    sale.loading ||
    !sale.saleOpen ||
    sale.remaining < minBuy ||
    !connected;

  const handlePayment = async () => {
    setBusy(true);
    try {
      await startPayment({
        tonConnectUI,
        connected,
        count: safeCount,
        buyerAddress,
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="glass buy-card">
      <span className="section-badge">BUY</span>
      <h2>خرید NFT</h2>

      <p className="buy-label">قیمت هر NFT</p>
      <h3 className="buy-price">{price} TON</h3>

      <p className="buy-label">
        باقی‌مانده: {sale.remaining?.toLocaleString?.() ?? "—"} /{" "}
        {sale.totalSupply?.toLocaleString?.() ?? "—"}
      </p>

      {!sale.saleOpen && (
        <p className="countdown-text">فروش هنوز شروع نشده است.</p>
      )}

      {sale.error && (
        <p className="countdown-text">خطا در دریافت اطلاعات فروش: {sale.error}</p>
      )}

      <div className="counter">
        <button
          type="button"
          disabled={safeCount <= minBuy || busy}
          onClick={() => setCount((c) => Math.max(minBuy, c - 1))}
        >
          −
        </button>
        <span>{safeCount}</span>
        <button
          type="button"
          disabled={safeCount >= maxBuy || busy}
          onClick={() => setCount((c) => Math.min(maxBuy, c + 1))}
        >
          +
        </button>
      </div>

      <div className="total-box">
        <small>جمع کل</small>
        <strong>{total} TON</strong>
      </div>

      <button
        className="gold-btn"
        type="button"
        disabled={disabled}
        onClick={handlePayment}
      >
        {!connected
          ? "ابتدا کیف پول را وصل کنید"
          : busy
            ? "در حال پردازش..."
            : "پرداخت با TON"}
      </button>
    </section>
  );
}

export default BuySection;
