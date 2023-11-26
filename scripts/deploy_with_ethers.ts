import { ethers } from "ethers";
import { Lottery__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config();

const BET_PRICE = 1;
const BET_FEE = 0.2;
const TOKEN_RATIO = 1000n;

async function main() {
    // provider config
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    // configure wallet
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
    console.log(`Using address ${wallet.address}`);
    const balanceBN = await provider.getBalance(wallet.address);
    const balance = Number(ethers.formatUnits(balanceBN));
    console.log(`Wallet balance ${balance} ETH`);
    if (balance < 0.01) {
      throw new Error("Not enough ether");
    }
    // deploy contract
    const LotteryFactory = new Lottery__factory(wallet);
    const lotteryContract = await LotteryFactory.deploy(
        "LotteryToken",
        "LT0",
        TOKEN_RATIO,
        ethers.parseUnits(BET_PRICE.toFixed(18)),
        ethers.parseUnits(BET_FEE.toFixed(18))
      );
    await lotteryContract.waitForDeployment();
    console.log(`Contract deployed to ${lotteryContract.target}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });