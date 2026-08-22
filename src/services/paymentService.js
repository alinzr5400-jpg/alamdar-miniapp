import { prepareMint, confirmMint, fetchMintOrder } from "./api";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function friendlyTonConnectError(err) {
  const raw = err instanceof Error ? err.message : String(err);
  if (/getClass\(\)|NullPointerException|null object reference/i.test(raw)) {
    return (
      "باگ شناخته‌شده Tonkeeper اندروید داخل تلگرام است (نه لزوماً قرارداد).\n\n" +
      "۱) سایت را در Chrome باز کن (نه داخل تلگرام) و دوباره مینت بزن\n" +
      "۲) یا از Tonkeeper دسکتاپ تست کن\n" +
      "۳) Tonkeeper را آپدیت/ری‌اینستال کن و دوباره Connect کن"
    );
  }
  if (/Failed to fetch/i.test(raw)) {
    return "ارتباط با سرور قطع شد (احتمالاً بیدار شدن Render). چند ثانیه صبر کنید و دوباره بزنید.";
  }
  return raw || "پرداخت یا مینت لغو شد.";
}

/**
 * TonConnect payment → backend confirm/mint.
 * PublicMint may need confirm polls while TonAPI indexes the new items.
 */
export async function startPayment({
  tonConnectUI,
  connected,
  count,
  buyerAddress,
  onProgress,
}) {
  const progress = (msg) => {
    if (typeof onProgress === "function") onProgress(msg);
  };

  if (!connected) {
    alert("ابتدا کیف پول را متصل کنید.");
    return { ok: false };
  }

  if (!buyerAddress) {
    alert("آدرس کیف پول یافت نشد.");
    return { ok: false };
  }

  try {
    progress("در حال آماده‌سازی تراکنش…");
    try {
      await fetch(
        `${(import.meta.env.VITE_API_URL || "").replace(/\/$/, "")}/health`
      );
    } catch {
      /* ignore */
    }

    const prepared = await prepareMint({ count, buyerAddress });
    const mode = prepared.mode || "admin";

    progress("در انتظار تأیید در کیف پول…");
    const result = await tonConnectUI.sendTransaction(prepared.transaction, {
      returnStrategy: "back",
      modals: ["before", "success", "error"],
      notifications: ["before", "success", "error"],
    });

    progress("پرداخت ارسال شد — در حال تأیید مینت…");
    let confirmed = await confirmMint({
      orderId: prepared.orderId,
      boc: result?.boc,
    });

    if (mode === "public" && confirmed.status !== "minted") {
      // ~90s total; each confirm is short on the server now.
      for (let i = 0; i < 30; i++) {
        progress(
          `در انتظار تأیید زنجیره… (${i + 1}/30) — صفحه را باز نگه دارید`
        );
        await sleep(3000);
        confirmed = await confirmMint({
          orderId: prepared.orderId,
          boc: result?.boc,
        });
        if (confirmed.status === "minted") break;

        try {
          const order = await fetchMintOrder(prepared.orderId);
          if (order?.status === "minted" && Array.isArray(order.mintIndices)) {
            confirmed = {
              status: "minted",
              mintIndices: order.mintIndices,
            };
            break;
          }
        } catch {
          /* ignore */
        }
      }
    }

    if (confirmed.status === "minted") {
      const ids = (confirmed.mintIndices || [])
        .map((id) => Number(id) + 1)
        .join(", #");
      progress("");
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

    progress("");
    alert(
      mode === "public"
        ? "پرداخت ثبت شد. اگر لیست NFT هنوز کامل نیست، ۱۰–۲۰ ثانیه صبر کنید یا یک‌بار رفرش کنید."
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
    progress("");
    const message = friendlyTonConnectError(err);
    alert(message);
    return { ok: false, error: message };
  }
}
