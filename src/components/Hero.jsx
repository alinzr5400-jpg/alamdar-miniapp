import { FaWallet, FaShoppingCart } from "react-icons/fa";

function Hero() {
  return (
    <section className="glass hero">

      <span className="badge">ALAMDAR NFT COLLECTION</span>

      <h2>علمدار</h2>

      <h3>اهتزاز پرچم ارزش‌ها در شبکه بلاکچین</h3>

      <p>
        نخستین مجموعه کلکسیونی شامل ۱۲۶۵۰ NFT بر بستر TON.
        کاربران پس از پایان فروش اولیه، کارت خود را در مرحله Reveal مشاهده خواهند کرد.
      </p>

      <div className="stats">

        <div className="stat">
          <strong>12650</strong>
          <span>کل NFT</span>
        </div>

        <div className="stat">
          <strong>0.5 TON</strong>
          <span>قیمت هر NFT</span>
        </div>

        <div className="stat">
          <strong>2 NFT</strong>
          <span>حداقل خرید</span>
        </div>

        <div className="stat">
          <strong>10 NFT</strong>
          <span>حداکثر خرید</span>
        </div>

      </div>

      <div className="actions">

        <button className="gold-btn">
          <FaWallet />
          اتصال کیف پول
        </button>

        <button className="ghost-btn">
          <FaShoppingCart />
          شروع خرید
        </button>

      </div>

    </section>
  );
}

export default Hero;