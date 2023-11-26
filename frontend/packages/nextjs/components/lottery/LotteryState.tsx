import { useState } from "react";
import * as lotteryJson from "../assets/Lottery.json";
import { HandleState } from "./HandleState";
import { Abi } from "viem";
import { useContractReads } from "wagmi";

const lottery_address = "0x6d018d25c62aDC1beD9854ff80420d40A008d87A";

const lotteryContract = {
  address: lottery_address,
  abi: lotteryJson.abi as Abi,
};

export const LotteryState = () => {
  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...lotteryContract,
        functionName: "betsOpen",
      },
      {
        ...lotteryContract,
        functionName: "betsClosingTime",
      },
    ],
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <>
      <HandleState betsOpen={data![0].result as boolean} betsClosingTime={data![1].result as number}></HandleState>
    </>
  );
};
