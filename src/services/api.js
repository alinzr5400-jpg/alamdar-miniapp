const API_BASE = (
  import.meta.env.VITE_API_URL || "/api"
).replace(/\/$/, "");

async function request(path, options = {}) {
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
}

export function fetchSaleConfig() {
  return request("/sale");
}

export function fetchGallery(limit = 6) {
  return request(`/gallery?limit=${limit}`);
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

export function fetchNft(id) {
  return request(`/nft/${id}`);
}

export function fetchWalletHoldings(address) {
  return request(`/wallet/${encodeURIComponent(address)}/holdings`);
}
