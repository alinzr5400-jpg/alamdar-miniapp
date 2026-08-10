/**
 * Lightweight Telegram Mini App init (no extra package).
 * Safe no-op outside Telegram.
 */
export function initTelegramWebApp() {
  const tg = window.Telegram?.WebApp;
  if (!tg) return null;

  try {
    tg.ready();
    tg.expand();

    if (typeof tg.setHeaderColor === "function") {
      tg.setHeaderColor("secondary_bg_color");
    }
    if (typeof tg.setBackgroundColor === "function") {
      tg.setBackgroundColor("bg_color");
    }
  } catch (err) {
    console.warn("Telegram WebApp init skipped:", err);
  }

  return tg;
}
