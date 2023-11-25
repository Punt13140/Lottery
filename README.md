# Lottery Team 7

- Implement ownable
- Owner deploy lottery and define betting price and fee
- Owner start lottery
  - Define a block timestamp target
- Players must buy an ERC20 with ETH
- Players pay ERC20 to bet
  - Only possible before block timestamp met
- Anyone can roll the lottery
  - Only after block timestamp target is met
  - Randomness from RANDAO
- Winner receives the pooled ERC20 minus fee
- Owner can withdraw fees and restart lottery
- Players can burn ERC20 tokens and redeem ETH

```bash
npm install
npx hardhat compile
npx hardhat run ./scripts/lottery.ts
```

Frontend
```bash
cd frontend
yarn install
yarn run
```
