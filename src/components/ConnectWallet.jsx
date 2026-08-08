import { TonConnectButton } from "@tonconnect/ui-react";

function ConnectWallet() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <TonConnectButton />
    </div>
  );
}

export default ConnectWallet;