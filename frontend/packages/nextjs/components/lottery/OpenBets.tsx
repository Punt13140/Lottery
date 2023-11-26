import { useState } from "react";
import * as lotteryJson from "../assets/Lottery.json";
import { parseEther } from "viem";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

const lottery_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const OpenBets = (params: { lastBlockTimestamp: number }) => {
  const [duration, setDuration] = useState("3600");

  const { config, error } = usePrepareContractWrite({
    address: lottery_address,
    abi: lotteryJson.abi,
    functionName: "openBets",
    args: [params.lastBlockTimestamp + Number(duration)],
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      <label className="label">
        <span className="label-text">Duration (in seconds) ?</span>
      </label>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={duration}
        onChange={e => setDuration(e.target.value)}
      />

      <button className="btn btn-active btn-neutral" disabled={!write || isLoading} onClick={() => write?.()}>
        {isLoading ? "Opening..." : "Open"}
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
      {error && <div>An error occurred preparing the transaction: {error.message}</div>}
    </div>
  );
};
