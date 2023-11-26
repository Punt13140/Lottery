import { CheckCanOpenBets } from "./CheckCanOpenBets";
import { formatUnits } from "viem";

const lottery_address = "0x6d018d25c62aDC1beD9854ff80420d40A008d87A";

export const HandleState = (params: { betsOpen: boolean; betsClosingTime: number }) => {
  const closingTimeDate = new Date(Number(params.betsClosingTime) * 1000);

  return (
    <>
      <div>
        <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
          <div className="card-body">
            <h2 className="card-title">Lottery State</h2>
            <p>The lottery is {params.betsOpen ? "open" : "closed"}</p>

            <p>
              Lottery should close at {closingTimeDate.toLocaleDateString()} : {closingTimeDate.toLocaleTimeString()}
            </p>
          </div>
        </div>
        {!params.betsOpen && <CheckCanOpenBets></CheckCanOpenBets>}
      </div>
    </>
  );
};
