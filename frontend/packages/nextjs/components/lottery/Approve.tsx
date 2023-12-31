import { useState } from "react";
import * as tokenJson from "../assets/LotteryToken.json";
import { maxInt256, parseEther } from "viem";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

const lottery_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const Approve = (params: { token_address: `0x${string}` }) => {
  const { config, error } = usePrepareContractWrite({
    address: params.token_address,
    abi: tokenJson.abi,
    functionName: "approve",
    args: [lottery_address, maxInt256],
  });
  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">Approve</h2>

          <p>We could move this component JUST before betting... </p>

          <button className="btn btn-active btn-neutral" disabled={!write || isLoading} onClick={() => write?.()}>
            {isLoading ? "Approving..." : "Approve"}
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
      </div>
    </div>
  );
};
