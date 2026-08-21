const API_BASE = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/$/, "");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function request(path, options = {}, retries = 2) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
        ...options,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }
      return data;
    } catch (err) {
      lastError = err;
      const msg = err instanceof Error ? err.message : String(err);
      const retryable =
        /Failed to fetch|NetworkError|timeout|503|502|429/i.test(msg) ||
        err instanceof TypeError;
      if (!retryable || attempt === retries) break;
      await sleep(1500 * (attempt + 1));
    }
  }
  throw lastError instanceof Error
    ? lastError
    : new Error("Failed to fetch");
}

export function fetchSaleConfig() {
  return request("/sale");
}

export function fetchShowcase() {
  return request("/showcase");
}

/** @deprecated use fetchShowcase — /gallery now returns curated showcase */
export function fetchGallery() {
  return fetchShowcase();
}

export function fetchMartyrs(q = "") {
  const query = q ? `?q=${encodeURIComponent(q)}` : "";
  return request(`/martyrs${query}`);
}

export function prepareMint({ count, buyerAddress }) {
  return request("/mint/prepare", {
    method: "POST",
    body: JSON.stringify({ count, buyerAddress }),
  });
}

export function confirmMint({ orderId, boc }) {
  return request("/mint/confirm", {
    method: "POST",
    body: JSON.stringify({ orderId, boc }),
  });
}

export function fetchMintOrder(orderId) {
  return request(`/mint/order/${encodeURIComponent(orderId)}`);
}

export function fetchNft(id) {
  return request(`/nft/${id}`);
}

export function fetchWalletHoldings(address) {
  return request(`/wallet/${encodeURIComponent(address)}/holdings`);
}
