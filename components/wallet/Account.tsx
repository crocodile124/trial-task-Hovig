import { useConnect, useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { normalize } from "viem/ens";

export function Account() {
  const { connect, connectors, error } = useConnect();
  const { isConnected, isConnecting, isDisconnected, address, connector } =
    useAccount();
  const result = useEnsAvatar({
    name: normalize("wevm.eth"),
    blockTag: "latest",
  });

  const ensName = useEnsName();
  console.log(result);
  return (
    <div className="mt-3">
      {isConnected ? (
        <span className="font-bold text-pink-500">
          {connector?.name}/{}
        </span>
      ) : (
        <span className="text-red-500">Didn't connected with wallet</span>
      )}
      {error && <div>{error.message}</div>}
    </div>
  );
}
