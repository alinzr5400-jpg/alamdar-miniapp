function Wallet() {
  return (
    <section className="glass wallet">
      <h3>کیف پول</h3>
      <p>
        قبل از خرید، کیف پول TON را وصل می‌کنیم تا NFT مستقیماً به کیف پول کاربر منتقل شود.
      </p>

      <div className="actions">
        <button className="gold-btn" type="button">
          Connect TON Wallet
        </button>
        <button className="ghost-btn" type="button">
          آموزش اتصال
        </button>
      </div>
    </section>
  );
}

export default Wallet;