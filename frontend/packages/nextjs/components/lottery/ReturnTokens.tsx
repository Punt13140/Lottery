import { useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction, useContractRead } from "wagmi";
import { parseUnits } from "viem";
import lotteryJson from "~~/components/assets/Lottery.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const ReturnTokens = () => {
  const [amount, setAmount] = useState("1");
  
  const{ config, error, isError } = usePrepareContractWrite({
      address: CONTRACT_ADDRESS,
      abi: lotteryJson.abi,
      functionName: "returnTokens",
      args: [parseUnits(amount, 18)]
    });
  
  const { data, write, isLoading, isSuccess } = useContractWrite(config);

  if(isError){
    console.log(error?.message);
  }

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">Return Tokens {}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            write?.();
          }}
        >
          <div className="form-control w-full max-w-xs my-4 mt-0">
            <label className="label">
              <span className="label-text">Amount:</span>
            </label>
            <input
              type="text"
              placeholder="Amount"
              className="input input-bordered w-full max-w-xs"
              value={amount}
              onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g,''))}
            />
          </div>
          <button className="btn btn-active btn-neutral" disabled={!write || isLoading}>
            {isLoading ? "Returning..." : "Return"}
          </button>
          {isError && <p>Not enough tokens or need to increase allowance</p>}
          {isSuccess && (
            <div>
              <p>Submitted transaction:</p>
              <a href={`https://sepolia.etherscan.io/tx/${data?.hash}`} target="_blank">
                Etherscan
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
