import { useWalletContext } from "../context/WalletContext";

function formatNetwork(chain) {
  if (chain === "-3" || chain === -3) return "Testnet";
  if (chain === "-239" || chain === -239) return "Mainnet";
  return chain || "—";
}

function WalletInfo() {
  const {
    connected,
    walletAddress,
    walletName,
    network,
  } = useWalletContext();

  if (!connected) {
    return (
      <div className="glass wallet-info">
        <h3>کیف پول</h3>

        <p>کیف پول متصل نشده است.</p>
      </div>
    );
  }

  const shortAddress =
    walletAddress.slice(0, 6) +
    "..." +
    walletAddress.slice(-4);

  return (
    <div className="glass wallet-info">
      <h3>کیف پول متصل شد ✅</h3>

      <p>
        <strong>Wallet:</strong> {walletName}
      </p>

      <p>
        <strong>Address:</strong> {shortAddress}
      </p>

      <p>
        <strong>Network:</strong> {formatNetwork(network)}
      </p>
    </div>
  );
}

export default WalletInfo;
