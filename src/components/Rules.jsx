import { MIN_BUY, MAX_BUY, NFT_PRICE, TOTAL_NFT } from "../config/constants";
import { useSale } from "../context/SaleContext";

function Rules() {
  const sale = useSale();
  const minBuy = sale.minBuy ?? MIN_BUY;
  const maxBuy = sale.maxBuy ?? MAX_BUY;
  const price = sale.mintPrice ?? NFT_PRICE;
  const total = sale.totalSupply ?? TOTAL_NFT;

  return (
    <section className="glass">
      <h2>قوانین پروژه</h2>

      <ul className="rules-list">
        <li>حداقل خرید: {minBuy} NFT</li>
        <li>حداکثر خرید: {maxBuy} NFT</li>
        <li>قیمت هر NFT: {price} TON</li>
        <li>
          عرضه کل: {total.toLocaleString("fa-IR")} (Legendary / Mythic / Unique)
        </li>
        <li>پس از رونمایی، تصویر و رده واقعی هر کارت نمایش داده می‌شود.</li>
        <li>NFT مستقیماً به کیف پول TON کاربر مینت می‌شود.</li>
        <li>دارندگان هر ۱۱۴ شخصیت واجد شرایط جوایز ویژه خواهند بود.</li>
      </ul>
    </section>
  );
}

export default Rules;
