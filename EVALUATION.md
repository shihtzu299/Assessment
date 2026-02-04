# Evaluation Guide – Full Stack Blockchain Engineer Assessment

**Internal use only. Do not share with candidates.**

## Purpose

This document helps the hiring team evaluate candidate submissions for the Full Stack Blockchain Engineer (Web3) take-home assessment.

## What to Run

1. **Contracts**
   - `cd contracts && npm install && npx hardhat compile`
   - `npx hardhat node` (in one terminal)
   - `npx hardhat run scripts/deploy.js --network localhost` (in another)
   - Note the deployed contract address.

2. **Backend**
   - `cd backend && npm install && cp .env.example .env`
   - Set `CONTRACT_ADDRESS` and `CHAIN_ID=31337` in `backend/.env`.
   - `npm run dev` – server should run at http://localhost:4000.
   - Verify: GET http://localhost:4000/api/health and GET http://localhost:4000/api/config.

3. **Web app**
   - Copy `.env.example` to `.env` in `frontend/`. Set `NEXT_PUBLIC_API_URL=http://localhost:4000` (or set `NEXT_PUBLIC_CONTRACT_ADDRESS` and `NEXT_PUBLIC_CHAIN_ID` if not using backend).
   - `cd frontend && npm install && npm run dev`
   - In the browser: add network (chain ID 31337, RPC http://127.0.0.1:8545), connect wallet, test increment/decrement.

4. **Documentation**
   - Read the candidate’s root **SOLUTION.md** for setup notes and design decisions.

## Evaluation Criteria

| Area | What to look for |
|------|------------------|
| **Correctness** | Contract: increment/decrement/getCount work; no underflow when count is 0. Backend: /api/health and /api/config return correct responses. Front-end: connects wallet, shows count, increment/decrement trigger tx and update UI. |
| **Code quality** | Readable structure, consistent style, sensible naming in contract, backend, and front-end. No obvious code smell or dead code. |
| **Security** | Solidity: no unchecked underflow; no unnecessary public/external exposure. Backend: config from env, no secrets in responses. Front-end: no hardcoded keys; config from backend or env. |
| **Backend** | RESTful endpoints, correct use of env, clear API. Front-end can use backend for config (or env). |
| **Web3 integration** | Proper wallet connect flow. Read vs write separation (view vs transaction). Basic handling of wrong network, user rejection, loading. |
| **Documentation** | SOLUTION.md explains how to run and any notable decisions. README in contracts/, backend/, and frontend/ are accurate. |

## Red flags

- Contract underflows (e.g. decrement below 0 without revert).
- Backend does not run or /api/config returns wrong or missing data.
- Front-end cannot connect to local chain or wrong contract address handling.
- No instructions to run the project or missing env setup.
- Copy-paste of large blocks without understanding (e.g. unrelated contracts or boilerplate).

## Green flags

- Clear setup instructions and working end-to-end flow (contract → backend → front-end).
- Thoughtful SOLUTION.md (trade-offs, improvements).
- Backend used by front-end for config (or clear choice to use env).
- Optional: unit tests for the contract, backend, or front-end.
- Optional: improved UX (loading states, error messages, network switch prompt).

## Scoring (optional)

You can use a simple scale (e.g. 1–5) per area (Correctness, Code quality, Security, Web3 integration, Documentation) and an overall recommend / no-recommend for the next interview stage.
