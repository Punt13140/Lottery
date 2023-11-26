import * as lotteryJson from "../assets/Lottery.json";
import { LastBlock } from "./LastBlock";
import { OpenBets } from "./OpenBets";
import { useAccount, useContractRead } from "wagmi";

const lottery_address = "0x6d018d25c62aDC1beD9854ff80420d40A008d87A";

export const CheckCanOpenBets = () => {
  const { address } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: lottery_address,
    abi: lotteryJson.abi,
    functionName: "owner",
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <>
      <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">Open Bets</h2>
          {data === address && <LastBlock></LastBlock>}
          {data !== address && <p>You're not the owner of the lottery!</p>}
        </div>
      </div>
    </>
  );
};
