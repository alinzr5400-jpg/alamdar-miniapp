import { FaShoppingCart } from "react-icons/fa";
import ConnectWallet from "./ConnectWallet";
import WalletInfo from "./WalletInfo";

function Hero({ openPayment }) {
  return (
    <section className="glass hero">

      <span className="badge">ALAMDAR NFT COLLECTION</span>

      <h2>علمدار</h2>

      <h3> خیمه دیجیتال روایت های ماندگار شهدای ایران</h3>

      <p>
        نخستین مجموعه کلکسیونی شامل ۱۲۶۵۰ NFT بر بستر TON.
        کاربران پس از پایان فروش اولیه، کارت NFT خود را در مرحله Reveal یا آشکار سازی مشاهده خواهند کرد.
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

  <ConnectWallet />

  <button className="ghost-btn">
    آموزش اتصال
  </button>

</div>

      <WalletInfo />

    </section>
  );
}

export default Hero;