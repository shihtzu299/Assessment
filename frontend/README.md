# Part 3: dApp Front-End

Build the counter dApp as described in the root **ASSESSMENT.md**. This folder contains a starter Next.js app with wallet connection and contract read/write using **wagmi** and **viem**. Config (contract address, chain ID) can be loaded from the **Node backend** (Part 2) or from env.

## Setup

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Deploy the Counter contract and start the backend (see root **SOLUTION.md** or **ASSESSMENT.md**). Then either:
   - **Option A (use backend):** In `backend/.env` set `CONTRACT_ADDRESS` and `CHAIN_ID`. In `frontend/.env` set `NEXT_PUBLIC_API_URL=http://localhost:4000`. Start the backend with `cd backend && npm run dev`.
   - **Option B (env only):** In `frontend/.env` set `NEXT_PUBLIC_CONTRACT_ADDRESS` and `NEXT_PUBLIC_CHAIN_ID`.

3. Install and run the web app:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000). Connect MetaMask (or another injected wallet) to the Hardhat local network (chain ID **31337**, RPC **http://127.0.0.1:8545**). Hardhat funds the first 20 accounts.

## Task

- Ensure the app connects to the wallet, displays the counter from the contract, and lets the user increment/decrement.
- Contract config should come from the backend API (when `NEXT_PUBLIC_API_URL` is set) or from env.
- Add or improve error handling (wrong network, rejected transaction, backend down).
- Document any setup steps in this README and in the root **SOLUTION.md**.

You may replace this starter with your own implementation (e.g. using ethers.js instead of wagmi) as long as the acceptance criteria in **ASSESSMENT.md** are met.
