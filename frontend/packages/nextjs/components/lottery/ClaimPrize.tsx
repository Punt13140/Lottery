import * as lotteryJson from "../assets/Lottery.json";
import { formatUnits } from "viem";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

const lottery_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const ClaimPrize = (params: { amount: bigint }) => {
  const { config, error } = usePrepareContractWrite({
    address: lottery_address,
    abi: lotteryJson.abi,
    functionName: "prizeWithdraw",
    args: [params.amount],
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  if (error) {
    console.log(error.message);
  }

  return (
    <>
      <button className="btn btn-active btn-neutral" disabled={!write || isLoading} onClick={() => write?.()}>
        {isLoading ? "Withdrawing..." : "Withdraw"}
      </button>

      {isSuccess && (
        <div>
          Success!
          <div>
            <a target="_blank" href={`https://sepolia.etherscan.io/tx/${data?.hash}`}>
              Etherscan
            </a>
          </div>
        </div>
      )}
    </>
  );
};
