import { useState } from "react";
import {
  NFT_PRICE,
  MIN_BUY,
  MAX_BUY,
} from "../config/constants";

function PaymentModal({ closeModal }) {
  const [count, setCount] = useState(MIN_BUY);

  const increase = () => {
    if (count < MAX_BUY) {
      setCount(count + 1);
    }
  };

  const decrease = () => {
    if (count > MIN_BUY) {
      setCount(count - 1);
    }
  };

  const totalPrice = (count * NFT_PRICE).toFixed(2);

  return (
    <div className="payment-overlay" onClick={closeModal}>
      <div
        className="payment-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={closeModal}>
          ✕
        </button>

        <h2>خرید NFT</h2>

        <p>قیمت هر NFT</p>

        <h3>{NFT_PRICE} TON</h3>

        <div className="counter">

          <button onClick={decrease}>−</button>

          <span>{count}</span>

          <button onClick={increase}>＋</button>

        </div>

        <p>جمع کل</p>

        <h2>{totalPrice} TON</h2>

        <button className="gold-btn">
          پرداخت با TON
        </button>
      </div>
    </div>
  );
}

export default PaymentModal;