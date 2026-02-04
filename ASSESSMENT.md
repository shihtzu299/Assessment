# Assessment – Full Stack Blockchain Engineer (Web3)

## Part 1: Smart Contract (Solidity)

Implement a simple **counter** contract with the following behavior. A reference implementation exists in `contracts/contracts/Counter.sol`; you may use it or replace it with your own.

### Requirements

- **Contract name:** `Counter` (or equivalent).
- **Storage:** One `uint256` value that can only be incremented or decremented.
- **Functions:**
  - `increment()` – increases the counter by 1.
  - `decrement()` – decreases the counter by 1 (no underflow; use Solidity 0.8+ or OpenZeppelin SafeMath if needed).
  - `getCount()` – view function that returns the current count.
- **Deployment:** Use Hardhat or Foundry. Include a script to deploy to a local node (e.g. `npx hardhat node` then deploy).

### Acceptance Criteria

- [ ] Contract compiles without errors.
- [ ] `increment` and `decrement` update the stored value correctly.
- [ ] `getCount()` returns the current value.
- [ ] Deploy script runs successfully on a local network.
- [ ] No underflow when current count is 0 and `decrement()` is called (revert or no-op is acceptable).

---

## Part 2: Node.js Backend (REST API)

Build a **Node.js** backend that exposes a small REST API for the dApp.

### Requirements

- Use **Node.js** with **Express** (or another backend framework you prefer).
- **GET /api/health** – returns a simple health check (e.g. `{ "status": "ok" }`).
- **GET /api/config** – returns the dApp configuration: `contractAddress` (deployed Counter address) and `chainId` (e.g. 31337 for local Hardhat). The front-end will use this to connect to the contract. Return an appropriate error (e.g. 503) if the contract address is not configured.
- Read `contractAddress` and `chainId` from environment variables (e.g. after deploying the contract, set them in `backend/.env`).
- Use **JavaScript** (Node.js). TypeScript is optional if you prefer.
- Document how to install, configure, and run the backend in `backend/README.md`.

### Acceptance Criteria

- [ ] Backend runs with `npm install` and `npm run dev` (or equivalent).
- [ ] GET /api/health returns a successful JSON response.
- [ ] GET /api/config returns contract address and chain ID when env is set; returns an error when contract address is missing.
- [ ] Clear instructions in `backend/README.md`.

---

## Part 3: dApp Front-End (Next.js + TypeScript)

Build a small **Next.js** app that:

1. **Connects to the user’s wallet** (e.g. MetaMask) using ethers.js and/or wagmi.
2. **Reads** the current counter value from your deployed contract.
3. **Allows the user to** increment and decrement the counter via buttons (transactions must be sent to the contract).

### Requirements

- Use **Next.js** (App Router or Pages Router is fine).
- Use **TypeScript**.
- Use **ethers.js** and/or **wagmi** (and optionally **viem**) for wallet connection and contract interaction.
- Obtain **contract address and chain ID** from the Node backend API (GET /api/config). If you prefer, the front-end may alternatively read them from environment variables (e.g. `NEXT_PUBLIC_CONTRACT_ADDRESS`, `NEXT_PUBLIC_CHAIN_ID`).
- After connecting the wallet, display:
  - The current counter value (from `getCount()`).
  - Buttons (or similar) to call `increment()` and `decrement()`.
- Handle loading and error states (e.g. wrong network, rejected transaction) in a basic way.
- You may use any UI library (Tailwind, plain CSS, etc.); visual polish is optional.

### Acceptance Criteria

- [ ] User can connect a wallet.
- [ ] Current counter value is displayed and updates after read/refresh.
- [ ] “Increment” and “Decrement” trigger contract calls and reflect the new value (after confirmation).
- [ ] Basic error/loading handling (e.g. wrong network, user rejection).
- [ ] Contract config (address, chain) comes from backend API or env.
- [ ] Clear instructions in `frontend/README.md` for installing deps, configuring contract address (or backend URL), and running the app.

---

## Part 4: Documentation (SOLUTION.md)

In the **root** of the repository, add a **SOLUTION.md** that includes:

1. **Setup & run**
   - How to install dependencies, run a local chain, deploy the contract, start the **backend**, and run the web app (in order).
   - Which network (e.g. Hardhat localhost) and contract address to use for testing.
2. **Decisions**
   - Brief notes on any design or trade-off decisions (e.g. Solidity version, backend framework, choice of wagmi vs ethers-only).
3. **Improvements**
   - What you would add or improve with more time (e.g. tests, UI, error handling, multi-chain, database).

---

## Evaluation Focus

We will look at:

- **Correctness** – Contract, backend API, and app behave as specified.
- **Code quality** – Readable, consistent style, sensible structure in contract, backend, and front-end.
- **Security** – No obvious vulnerabilities (e.g. no unchecked underflow in Solidity); no secrets in front-end.
- **Backend** – RESTful design, correct use of env, clear API.
- **Web3 integration** – Proper use of wallet connection and contract read/write.
- **Documentation** – Clear README and SOLUTION.md so we can run and understand your solution.

You do **not** need to write automated tests for this assessment, but they are a plus if time allows.
