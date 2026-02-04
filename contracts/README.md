# Part 1: Smart Contract

Implement the **Counter** contract as described in the root **ASSESSMENT.md**.

## Setup

```bash
cd contracts
npm install
```

## Contract Task

- Complete the `Counter` contract in `contracts/Counter.sol`.
- Implement `increment()`, `decrement()`, and `getCount()`.
- Use Solidity 0.8+ so that overflow/underflow reverts automatically, or handle underflow in `decrement()` (e.g. revert when count is 0).

## Compile

```bash
npx hardhat compile
```

## Test (optional but recommended)

```bash
npx hardhat test
```

## Deploy locally

In one terminal:

```bash
npx hardhat node
```

In another terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Save the deployed contract address; you will need it in the frontend (e.g. in a config file or environment variable).
