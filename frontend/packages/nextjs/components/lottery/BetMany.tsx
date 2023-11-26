import { useState } from "react";
import * as lotteryJson from "../assets/Lottery.json";
import { formatUnits } from "viem";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

const lottery_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const BetMany = (params: { betPrice: bigint; betFee: bigint }) => {
  const [times, setTimes] = useState<number>(3);

  const { config, error } = usePrepareContractWrite({
    address: lottery_address,
    abi: lotteryJson.abi,
    functionName: "betMany",
    args: [times],
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
      <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">Bet Many</h2>

          <label className="label">
            <span className="label-text">Amount?</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            value={times}
            onChange={e => setTimes(parseInt(e.target.value.replace(/\D/, "")))}
          />

          <p>Price: {formatUnits(params.betPrice * BigInt(times), 18)}</p>
          <p>Fee: {formatUnits(params.betFee * BigInt(times), 18)}</p>

          <button className="btn btn-active btn-neutral" disabled={!write || isLoading} onClick={() => write?.()}>
            {!write ? "Approve first..." : isLoading ? "Loading..." : "Bet"}
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
        </div>
      </div>
    </>
  );
};
