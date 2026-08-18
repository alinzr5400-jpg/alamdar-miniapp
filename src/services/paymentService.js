import { prepareMint, confirmMint } from "./api";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
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
    const prepared = await prepareMint({ count, buyerAddress });
    const mode = prepared.mode || "admin";

    const result = await tonConnectUI.sendTransaction(prepared.transaction);

    let confirmed = await confirmMint({
      orderId: prepared.orderId,
      boc: result?.boc,
    });

    // Public mint: chain mint is instant-ish, indexer may lag — retry confirm.
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
    const message =
      err instanceof Error ? err.message : "پرداخت یا مینت لغو شد.";
    alert(message);
    return { ok: false, error: message };
  }
}
