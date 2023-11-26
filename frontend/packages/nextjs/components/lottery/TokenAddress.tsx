import * as lotteryJson from "../assets/Lottery.json";
import { Approve } from "./Approve";
import { TokenBalance } from "./TokenBalance";
import { useContractRead } from "wagmi";

const lottery_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const TokenAddress = () => {
  const { data, isError, isLoading } = useContractRead({
    address: lottery_address,
    abi: lotteryJson.abi,
    functionName: "paymentToken",
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <>
      <TokenBalance token_address={data as `0x${string}`}></TokenBalance>
      <Approve token_address={data as `0x${string}`}></Approve>
    </>
  );
};
