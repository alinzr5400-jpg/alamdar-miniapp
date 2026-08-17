import { TOTAL_NFT } from "../config/constants";

function Footer() {
  return (
    <footer className="glass footer">
      <div className="footer-line"></div>

      <p className="footer-main">
        « قُومُوا لِلَّهِ؛ قیام دیجیتال در سنگر فناوری »
      </p>

      <p className="footer-sub">
        سهم تو از تمدن نوین اسلامی در فضای مجازی چیست؟
      </p>

      <div className="footer-info">
        <div>🟡 Powered by TON</div>
        <div>🟡 {TOTAL_NFT.toLocaleString("en-US")} NFT Collection</div>
        <div>🟡 Made with ❤️ in Iran</div>
      </div>

      <div className="footer-line"></div>
    </footer>
  );
}

export default Footer;
