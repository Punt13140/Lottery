import { CheckCanBet } from "./CheckCanBet";
import { CheckCanOpenBets } from "./CheckCanOpenBets";
import { CheckPrize } from "./CheckPrize";
import { CloseBets } from "./CloseBets";
import { GetPriceAndFee } from "./GetPriceAndFee";
import { formatUnits } from "viem";

const lottery_address = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

export const HandleState = (params: { betsOpen: boolean; betsClosingTime: number }) => {
  const closingTimeDate = new Date(Number(params.betsClosingTime) * 1000);

  return (
    <>
      <div>
        <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
          <div className="card-body">
            <h2 className="card-title">Lottery State</h2>
            <p>The lottery is {params.betsOpen ? "open" : "closed"}</p>

            {!params.betsOpen && closingTimeDate.getTime() < Date.now() && (
              <p>The lottery is over!!! Winners can withdraw !!</p>
            )}

            {params.betsOpen && (
              <p>
                Lottery should close at {closingTimeDate.toLocaleDateString()} : {closingTimeDate.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
        {/* Bets not open, check if you're the owner and can open bets */}
        {!params.betsOpen && closingTimeDate.getTime() > Date.now() && <CheckCanOpenBets></CheckCanOpenBets>}
        {/* Bets not open and closing date passed => Lottery over, show if you won */}
        {!params.betsOpen && closingTimeDate.getTime() < Date.now() && <CheckPrize></CheckPrize>}
        {/* Bets open and closing date not passed => You can vote, show price and fee and bet/betMany */}
        {params.betsOpen && closingTimeDate.getTime() > Date.now() && <GetPriceAndFee></GetPriceAndFee>}
        {/* Bets open and closing date passed => Lottery is over, you can call closeLottery */}
        {params.betsOpen && closingTimeDate.getTime() < Date.now() && <CloseBets></CloseBets>}
      </div>
    </>
  );
};
