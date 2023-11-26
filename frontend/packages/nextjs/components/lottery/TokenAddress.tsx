import * as lotteryJson from "../assets/Lottery.json";
import { Approve } from "./Approve";
import { TokenBalance } from "./TokenBalance";
import { useContractRead } from "wagmi";

const lottery_address = "0x6d018d25c62aDC1beD9854ff80420d40A008d87A";

export const TokenAddress = (params: { address: `0x${string}` }) => {
  const { data, isError, isLoading } = useContractRead({
    address: lottery_address,
    abi: lotteryJson.abi,
    functionName: "paymentToken",
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <>
      <TokenBalance address={params.address} token_address={data as `0x${string}`}></TokenBalance>
      <Approve token_address={data as `0x${string}`}></Approve>
    </>
  );
};
