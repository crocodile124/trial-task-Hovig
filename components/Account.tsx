import { useConnect, useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { normalize } from "viem/ens";

export function Account() {
  const { connect, connectors, error } = useConnect();
  const { isConnected, isConnecting, isDisconnected, address, connector } = useAccount();
  const ensAvatar = useEnsAvatar({
    name: normalize("wevm.eth"),
  });
  const ensName = useEnsName();
  console.log(ensName);
  return (
    <div>
      {/* {connectors.map((connector) => (
        <button
          className="px-5 border  border-black"
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
        </button>
      ))} */}
      {isConnected ? (
        <span className="text-red-500">{connector?.name}/{ensName.data}</span>
      ) : (
        <span className="text-red-500">not connected</span>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
}
