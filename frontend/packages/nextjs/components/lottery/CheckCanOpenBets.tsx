import * as lotteryJson from "../assets/Lottery.json";
import { LastBlock } from "./LastBlock";
import { OpenBets } from "./OpenBets";
import { useAccount, useContractRead } from "wagmi";
import { OwnerWithdraw } from "./OwnerWithdraw";

const lottery_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

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
          <h2 className="card-title">Owner functions</h2>
          {data === address && 
            <>
              <LastBlock></LastBlock>
              <OwnerWithdraw></OwnerWithdraw>
            </>
          }
          {data !== address && <p>You're not the owner of the lottery!</p>}
        </div>
      </div>
    </>
  );
};
