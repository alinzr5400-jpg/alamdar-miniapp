import { prepareMint, confirmMint } from "./api";

/**
 * TonConnect payment → backend confirm/mint.
 * Returns { ok, status, mintIndices } so UI can refresh sale/gallery.
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

    const result = await tonConnectUI.sendTransaction(prepared.transaction);

    const confirmed = await confirmMint({
      orderId: prepared.orderId,
      boc: result?.boc,
    });

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
        mintIndices: confirmed.mintIndices || [],
        orderId: prepared.orderId,
      };
    }

    alert("پرداخت ارسال شد. مینت روی زنجیره در حال پردازش است.");
    return {
      ok: true,
      status: confirmed.status || "paid",
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
