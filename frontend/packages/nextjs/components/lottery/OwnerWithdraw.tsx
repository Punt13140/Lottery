import { useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import lotteryJson from "~~/components/assets/Lottery.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const OwnerWithdraw = () => {
  const [amount, setAmount] = useState("");
  const { address } = useAccount();
  const [owner, setOwner] = useState("");
  const [ownerPool, setOwnerPool] = useState("");

  useContractRead({
    address: CONTRACT_ADDRESS,
    abi: lotteryJson.abi,
    functionName: "owner",
    async onSuccess(data: string) {
      setOwner(data);
    },
  });

  useContractRead({
    address: CONTRACT_ADDRESS,
    abi: lotteryJson.abi,
    functionName: "ownerPool",
    async onSuccess(data: bigint) {
      setOwnerPool(formatUnits(data, 18));
      setAmount(formatUnits(data, 18));
    },
  });

  const { config, error, isError } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: lotteryJson.abi,
    functionName: "ownerWithdraw",
    args: [parseUnits(amount, 18)],
  });
  const { data, write, isLoading, isSuccess } = useContractWrite(config);

  if (isError) {
    console.log(error?.message);
  }

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">Owner Withdraw {}</h2>
        {owner === address && (
          <form
            onSubmit={e => {
              e.preventDefault();
              write?.();
            }}
          >
            <div className="form-control w-full max-w-xs my-4 mt-0">
              <label className="label">
                <span className="label-text">Fee collected: {ownerPool}</span>
              </label>
              <label className="label">
                <span className="label-text">Withdraw amount: </span>
              </label>
              <input
                type="text"
                placeholder="Amount"
                className="input input-bordered w-full max-w-xs"
                value={amount}
                onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
              />
            </div>
            <button className="btn btn-active btn-neutral" disabled={!write || isLoading}>
              {isLoading ? "`Withdrawing`..." : "Withdraw"}
            </button>
            {isSuccess && (
              <div>
                <p>Submitted transaction:</p>
                <a href={`https://sepolia.etherscan.io/tx/${data?.hash}`} target="_blank">
                  Etherscan
                </a>
              </div>
            )}
          </form>
        )}
        {owner !== address && <p>You're not the owner of the lottery!</p>}
      </div>
    </div>
  );
};
