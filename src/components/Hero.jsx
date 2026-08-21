import { useState } from "react";
import ConnectWallet from "./ConnectWallet";
import WalletInfo from "./WalletInfo";
import { useSale } from "../context/SaleContext";
import { TOTAL_NFT, NFT_PRICE, MIN_BUY, MAX_BUY } from "../config/constants";

function Hero() {
  const sale = useSale();
  const [showHelp, setShowHelp] = useState(false);
  const total = sale.totalSupply ?? TOTAL_NFT;
  const price = sale.mintPrice ?? NFT_PRICE;
  const minBuy = sale.minBuy ?? MIN_BUY;
  const maxBuy = sale.maxBuy ?? MAX_BUY;
  const revealed = Boolean(sale.reveal);

  return (
    <section className="glass hero" id="hero">
      <span className="badge">ALAMDAR NFT COLLECTION</span>

      <h2>علمدار</h2>

      <h3>خیمه دیجیتال روایت‌های ماندگار شهدای ایران</h3>

      <p>
        مجموعه کلکسیونی شامل {total.toLocaleString("fa-IR")} NFT بر بستر TON —
        Legendary، Mythic و Unique.
        {revealed
          ? " Reveal فعال است؛ کارت‌های مینت‌شده با تصویر واقعی دیده می‌شوند."
          : " تا قبل از Reveal تصاویر مخفی هستند."}
      </p>

      <div className="stats">
        <div className="stat">
          <strong>{total.toLocaleString("en-US")}</strong>
          <span>کل NFT</span>
        </div>

        <div className="stat">
          <strong>{price} TON</strong>
          <span>قیمت هر NFT</span>
        </div>

        <div className="stat">
          <strong>{minBuy} NFT</strong>
          <span>حداقل خرید</span>
        </div>

        <div className="stat">
          <strong>{maxBuy} NFT</strong>
          <span>حداکثر خرید</span>
        </div>
      </div>

      <div className="actions">
        <ConnectWallet />

        <button
          type="button"
          className="ghost-btn"
          onClick={() => setShowHelp((v) => !v)}
        >
          {showHelp ? "بستن آموزش" : "آموزش اتصال"}
        </button>
      </div>

      {showHelp && (
        <div className="connect-help" id="connect-help">
          <ol className="rules-list">
            <li>کیف پول را روی <strong>Testnet</strong> بگذارید (نه Mainnet).</li>
            <li>دکمه اتصال را بزنید و Tonkeeper را انتخاب کنید.</li>
            <li>حداقل خرید {minBuy} NFT است؛ برای {minBuy}×{price} TON + گاز آماده باشید.</li>
            <li>بعد از مینت، بخش «NFTهای من» دارایی همین کیف را نشان می‌دهد.</li>
          </ol>
        </div>
      )}

      <WalletInfo />
    </section>
  );
}

export default Hero;
