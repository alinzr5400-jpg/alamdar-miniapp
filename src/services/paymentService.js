import { prepareMint, confirmMint } from "./api";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function friendlyTonConnectError(err) {
  const raw = err instanceof Error ? err.message : String(err);
  if (/getClass\(\)|NullPointerException|null object reference/i.test(raw)) {
    return (
      "خطای کیف پول اندروید (TonConnect). یک‌بار کیف را Disconnect کنید، دوباره وصل کنید، " +
      "مطمئن شوید Tonkeeper روی Testnet است، بعد دوباره مینت را بزنید. " +
      "اگر باز خطا بود، از Tonkeeper دسکتاپ/مرورگر امتحان کنید."
    );
  }
  if (/Failed to fetch/i.test(raw)) {
    return "ارتباط با سرور قطع شد (احتمالاً بیدار شدن Render). چند ثانیه صبر کنید و دوباره بزنید.";
  }
  return raw || "پرداخت یا مینت لغو شد.";
}

/**
 * TonConnect payment → backend confirm/mint.
 * PublicMint may need a few confirm retries while TonAPI indexes the new items.
 */
export async function startPayment({
  tonConnectUI,
  connected,
  count,
  buyerAddress,
}) {
  if (!connected) {
    alert("ابتدا کیف پول را متصل کنید.");
    return { ok: false };
  }

  if (!buyerAddress) {
    alert("آدرس کیف پول یافت نشد.");
    return { ok: false };
  }

  try {
    // Wake backend (Render free cold start) before prepare.
    try {
      await fetch(
        `${(import.meta.env.VITE_API_URL || "").replace(/\/$/, "")}/health`
      );
    } catch {
      /* ignore */
    }

    const prepared = await prepareMint({ count, buyerAddress });
    const mode = prepared.mode || "admin";

    const result = await tonConnectUI.sendTransaction(prepared.transaction);

    let confirmed = await confirmMint({
      orderId: prepared.orderId,
      boc: result?.boc,
    });

    if (mode === "public" && confirmed.status === "paid") {
      for (let i = 0; i < 8; i++) {
        await sleep(3000);
        confirmed = await confirmMint({
          orderId: prepared.orderId,
          boc: result?.boc,
        });
        if (confirmed.status === "minted") break;
      }
    }

    if (confirmed.status === "minted") {
      const ids = (confirmed.mintIndices || []).join(", ");
      alert(
        ids
          ? `خرید موفق بود. NFTهای شما: #${ids}`
          : "خرید و مینت با موفقیت انجام شد."
      );
      return {
        ok: true,
        status: "minted",
        mode,
        mintIndices: confirmed.mintIndices || [],
        orderId: prepared.orderId,
      };
    }

    alert(
      mode === "public"
        ? "پرداخت به قرارداد ارسال شد. اگر NFT هنوز نیامد، چند ثانیه بعد کیف پول را رفرش کنید."
        : "پرداخت ارسال شد. مینت روی زنجیره در حال پردازش است."
    );
    return {
      ok: true,
      status: confirmed.status || "paid",
      mode,
      mintIndices: [],
      orderId: prepared.orderId,
    };
  } catch (err) {
    console.error(err);
    const message = friendlyTonConnectError(err);
    alert(message);
    return { ok: false, error: message };
  }
}
