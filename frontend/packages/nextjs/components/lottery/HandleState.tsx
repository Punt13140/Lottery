import { CheckCanBet } from "./CheckCanBet";
import { CheckCanOpenBets } from "./CheckCanOpenBets";
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
        {!params.betsOpen && <CheckCanOpenBets></CheckCanOpenBets>}
        {params.betsOpen && <CheckCanBet closingTime={closingTimeDate}></CheckCanBet>}
      </div>
    </>
  );
};
