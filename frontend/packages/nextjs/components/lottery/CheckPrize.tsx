import * as lotteryJson from "../assets/Lottery.json";
import { ClaimPrize } from "./ClaimPrize";
import { formatUnits } from "viem";
import { useAccount, useContractRead } from "wagmi";

const lottery_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const CheckPrize = () => {
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: lottery_address,
    abi: lotteryJson.abi,
    functionName: "prize",
    args: [address],
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <>
      <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">Winner ?</h2>
          {data === BigInt(0) && <p>You're not the winner of the lottery!</p>}
          {(data as bigint) > BigInt(0) && (
            <>
              <p>
                You're the winner of the lottery!
                <br />
                You won {formatUnits(data as bigint, 18)} LT0!
              </p>
              <ClaimPrize amount={data as bigint}></ClaimPrize>
            </>
          )}
        </div>
      </div>
    </>
  );
};
