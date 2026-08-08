import { useEffect, useMemo, useState } from "react";
import { useSale } from "../context/SaleContext";

function pad(n) {
  return String(n).padStart(2, "0");
}

function Countdown() {
  const sale = useSale();
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const remaining = useMemo(() => {
    if (!sale.saleStartsAt) return 0;
    return Math.max(sale.saleStartsAt - now, 0);
  }, [sale.saleStartsAt, now]);

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const statusText = sale.saleOpen
    ? "فروش فعال است."
    : sale.saleStartsAt
      ? "زمان باقی‌مانده تا شروع فروش"
      : "زمان فروش از سرور دریافت می‌شود.";

  return (
    <section className="glass countdown-card">
      <span className="section-badge">MINT</span>
      <h2>{sale.saleOpen ? "فروش آغاز شده" : "شروع فروش"}</h2>

      <div className="countdown">
        <div className="time-box">
          <strong>{pad(days)}</strong>
          <span>روز</span>
        </div>
        <span className="dots">:</span>
        <div className="time-box">
          <strong>{pad(hours)}</strong>
          <span>ساعت</span>
        </div>
        <span className="dots">:</span>
        <div className="time-box">
          <strong>{pad(minutes)}</strong>
          <span>دقیقه</span>
        </div>
        <span className="dots">:</span>
        <div className="time-box">
          <strong>{pad(seconds)}</strong>
          <span>ثانیه</span>
        </div>
      </div>

      <p className="countdown-text">{statusText}</p>
      <p className="countdown-text">
        مینت‌شده: {sale.minted?.toLocaleString?.() ?? "—"} | شبکه:{" "}
        {sale.network ?? "—"}
      </p>
    </section>
  );
}

export default Countdown;
