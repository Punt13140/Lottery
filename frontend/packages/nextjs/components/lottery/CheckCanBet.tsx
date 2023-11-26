import { Bet } from "./Bet";
import { CloseBets } from "./CloseBets";
import { GetPriceAndFee } from "./GetPriceAndFee";

export const CheckCanBet = (params: { closingTime: Date }) => {
  const canBet = params.closingTime > new Date();

  if (canBet) return <GetPriceAndFee></GetPriceAndFee>;

  return <CloseBets></CloseBets>;
};
