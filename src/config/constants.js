export const PROJECT_NAME = "Alamdar";
export const NFT_PRICE = 0.5;
export const MIN_BUY = 2;
export const MAX_BUY = 88;
export const TOTAL_NFT = 16120;
export const TOTAL_CHARACTERS = 114;

/** On-chain index is 0-based; user-facing numbers start at #1. */
export function displayNftNo(tokenId) {
  const n = Number(tokenId);
  return Number.isInteger(n) && n >= 0 ? n + 1 : tokenId;
}
