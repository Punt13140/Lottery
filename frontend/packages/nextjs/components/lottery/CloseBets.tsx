import * as lotteryJson from "../assets/Lottery.json";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

const lottery_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const CloseBets = () => {
  const { config, error } = usePrepareContractWrite({
    address: lottery_address,
    abi: lotteryJson.abi,
    functionName: "closeLottery",
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
          <h2 className="card-title">Close Bet</h2>

          <button className="btn btn-active btn-neutral" disabled={!write || isLoading} onClick={() => write?.()}>
            {isLoading ? "Loading..." : "Close"}
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
