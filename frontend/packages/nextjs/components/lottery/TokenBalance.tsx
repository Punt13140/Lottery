import * as tokenJson from "../assets/LotteryToken.json";
import { formatUnits } from "viem";
import { useAccount, useContractRead } from "wagmi";

export const TokenBalance = (params: { token_address: `0x${string}` }) => {
  const { address } = useAccount();

  const { data, isError, isLoading } = useContractRead({
    address: params.token_address,
    abi: tokenJson.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <>
      <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">Balance Tokens</h2>
          <p>Curent balance : {formatUnits(data as bigint, 18)}</p>
        </div>
      </div>
    </>
  );
};
