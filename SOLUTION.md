# Solution – Full Stack Blockchain Engineer Assessment

This submission implements a minimal full-stack decentralized application consisting of:

- Solidity smart contract (Counter)
- Node.js Express backend (REST API for config)
- Next.js + TypeScript front-end dApp using wagmi/viem

The application allows a user to connect a wallet, read the counter value, and increment/decrement it on-chain.

---

## Tested Environment

- Windows 11 PowerShell
- Node.js v18+
- Hardhat v2.x
- Ethers v5.x

---

## Clone & Navigate to Project Root

After cloning the repository, open a terminal and navigate into the project root:

```bash
git clone <REPO_URL>
cd Assessment

---

## Quick Start (Fastest Way to Run)

1. Start local blockchain:
   cd contracts && npx hardhat node

2. Deploy contract:
   npx hardhat run scripts/deploy.js --network localhost

3. Start backend:
   cd backend && npm run dev

4. Start frontend:
   cd frontend && npm run dev

---

# 1. Setup & Run

## Prerequisites

- Node.js 18+
- npm
- MetaMask (or another injected wallet)

---

## Step 1 — Install dependencies

Install dependencies for each part separately:

```bash
cd contracts && npm install
cd ../backend && npm install
cd ../frontend && npm install
```

---

## Step 2 — Start the local blockchain

From the contracts folder:

```bash
cd contracts
npx hardhat node
```

Keep this terminal running.

This starts a local Ethereum network on:

```
http://127.0.0.1:8545
Chain ID: 31337
```

---

## Step 3 — Deploy the smart contract

Open a new terminal:

```bash
cd contracts
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address printed in the console.

Example:

```
Counter deployed to: 0xABC...
```

You will use this address for the backend configuration.

---

## Step 4 — Configure and run backend

Create environment file:

```bash
cd backend
cp .env
```

Edit `.env`:

```
CONTRACT_ADDRESS=<PASTE_DEPLOYED_ADDRESS>
CHAIN_ID=31337
PORT=4000
```

Run backend:

```bash
npm run dev
```

Backend runs at:

```
http://localhost:4000
```

Verify:

```
http://localhost:4000/api/health
http://localhost:4000/api/config
```

---

## Step 5 — Configure and run frontend

Create environment file:

```bash
cd frontend
cp .env
```

Set:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Run frontend:

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Step 6 — Configure MetaMask for local network

Add network:

- RPC: `http://127.0.0.1:8545`
- Chain ID: `31337`
- Currency: ETH

Import one of the private keys printed by Hardhat node.

These accounts contain test ETH for gas.

---

## Step 7 — Use the application

1. Connect wallet
2. View counter value
3. Click Increment / Decrement
4. Confirm transaction
5. UI automatically refreshes after confirmation

---

# 2. Decisions

## Solidity / Contract

- Solidity version **0.8.20** used for built-in overflow/underflow protection.
- `uint256 private _count` used to encapsulate state.
- `require(_count > 0)` prevents decrement underflow.
- Minimal interface chosen intentionally to match assessment scope.

---

## Backend Design

- Express.js used for simplicity and clarity.
- Contract address and chain ID are provided via environment variables.
- `/api/config` endpoint allows frontend to dynamically load deployment configuration.

This avoids hardcoding contract addresses in the UI and mirrors real production setups.

---

## Frontend Design

### wagmi + viem

wagmi was chosen because:

- modern React-first Web3 integration
- built-in wallet connection handling
- clean contract read/write hooks
- automatic chain + provider management

### Transaction confirmation handling

After sending transactions, the UI listens for transaction receipts and refetches contract state automatically.

This prevents the need for manual page refresh and improves UX.

### UX improvements added

- Disabled decrement button when counter is zero to prevent unnecessary contract reverts.
- Added automatic UI refresh after transaction confirmation so users do not need to manually reload the page.
- Displays wallet connection status and connected address for clarity.
- Shows transaction states:
  - Confirming
- Implemented receipt-based state refetching to ensure blockchain updates are reflected in the UI.

---

## Deployment Script Fix

The provided deploy script used ethers v6 syntax while the project dependencies used ethers v5.

The script was updated to use:

```
await counter.deployed()
counter.address
```

instead of:

```
waitForDeployment()
getAddress()
```

This ensures compatibility with Hardhat v2.

---

# 3. Improvements (With More Time)

If extended further, I would add:

## Smart Contract

- Unit tests with Hardhat + Chai
- Events emitted on increment/decrement
- Role-based access control (optional)

---

## Backend

- Persistent activity logging (database instead of memory)
- Rate limiting
- Structured request validation
- Health monitoring metrics

---

## Frontend

- Better transaction progress UI
- Automatic network switching prompt
- Toast notifications for success/error
- Loading skeleton for contract reads

---

## Infrastructure

- Docker setup for all services
- Deployment scripts for testnet
- CI pipeline for linting and tests

---

# Summary

This solution demonstrates:

- Smart contract deployment with Hardhat
- REST backend configuration management
- Wallet connection and on-chain transactions via wagmi
- Automatic UI state refresh after blockchain confirmation

The implementation prioritizes correctness, clarity, and maintainability while remaining minimal per the assessment requirements.
