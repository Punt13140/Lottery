import { OpenBets } from "./OpenBets";
import { formatUnits } from "viem";

const lottery_address = "0x6d018d25c62aDC1beD9854ff80420d40A008d87A";

export const HandleState = (params: { betsOpen: boolean; betsClosingTime: number }) => {
  return (
    <>
      <div>
        <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
          <div className="card-body">
            <h2 className="card-title">Lottery State</h2>
            <p>Bets open : {params.betsOpen.toString()}</p>
            <p>Bets closing time : {params.betsClosingTime.toString()}</p>
          </div>
        </div>
        {!params.betsOpen && <OpenBets></OpenBets>}
      </div>
    </>
  );
};
