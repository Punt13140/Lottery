import { useEffect, useState } from "react";
import { OpenBets } from "./OpenBets";
import { Block } from "viem";
import { useBlockNumber, usePublicClient } from "wagmi";

export const LastBlock = () => {
  const [block, setBlock] = useState(null as Block | null);
  const publicClient = usePublicClient();

  /// https://github.com/wevm/wagmi/discussions/2071#discussioncomment-5951243
  useEffect(() => {
    publicClient
      .getBlock() // https://viem.sh/docs/actions/public/getBlock.html
      .then(x => setBlock(x))
      .catch(error => console.log(error));
  }, [publicClient]);

  if (!block) return <p>Loading...</p>;

  if (block.timestamp === undefined) return <p>Error</p>;

  return (
    <>
      <OpenBets lastBlockTimestamp={Number(block.timestamp)}></OpenBets>
    </>
  );
};
