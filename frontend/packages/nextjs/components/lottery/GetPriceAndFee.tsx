import * as lotteryJson from "../assets/Lottery.json";
import { Bet } from "./Bet";
import { BetMany } from "./BetMany";
import { Abi } from "viem";
import { useContractReads } from "wagmi";

const lottery_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const lotteryContract = {
  address: lottery_address,
  abi: lotteryJson.abi as Abi,
};

export const GetPriceAndFee = () => {
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...lotteryContract,
        functionName: "betPrice",
      },
      {
        ...lotteryContract,
        functionName: "betFee",
      },
    ],
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <>
      <Bet betPrice={data![0].result as bigint} betFee={data![1].result as bigint}></Bet>
      <BetMany betPrice={data![0].result as bigint} betFee={data![1].result as bigint}></BetMany>
    </>
  );
};
