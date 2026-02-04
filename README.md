# Full Stack Blockchain Engineer (Web3) – Take-Home Assessment

Welcome! This repository contains a practical assessment for the **Full Stack Blockchain Engineer** role at DecryptCode INC. Complete the tasks below and submit your solution as instructed in your application.

## Overview

You will build a minimal **decentralized application (dApp)** that includes:

1. **Smart contract** – A simple on-chain component (Solidity).
2. **Node.js backend** – A REST API that serves dApp config (contract address, chain ID).
3. **Web front-end** – A Next.js app that connects to a wallet and interacts with the contract (using config from the backend or env).

We expect this to take **about 1 day**. Focus on clean code, correctness, and a working flow rather than extra features.

## Prerequisites

- Node.js 18+
- npm or yarn
- A browser wallet (e.g. MetaMask)
- Basic familiarity with Solidity, React/Next.js, and Web3 (ethers.js or wagmi)

## Repository Structure

```
.
├── README.md                 # This file
├── ASSESSMENT.md             # Detailed task description and requirements
├── contracts/                # Smart contract (Solidity) – Part 1
│   ├── README.md
│   └── ...
├── backend/                  # Node.js REST API – Part 2
│   ├── README.md
│   └── ...
├── frontend/                 # Next.js dApp – Part 3
│   ├── README.md
│   └── ...
└── EVALUATION.md             # For hiring team only (do not share with candidates)
```

## What to Do

1. Read **ASSESSMENT.md** for the full task description and acceptance criteria.
2. Implement **Part 1** in the `contracts/` folder (see `contracts/README.md`).
3. Implement **Part 2** in the `backend/` folder (see `backend/README.md`).
4. Implement **Part 3** in the `frontend/` folder (see `frontend/README.md`).
5. Ensure all parts run and work together (backend serves config; front-end reads/writes the contract).
6. Add a short **SOLUTION.md** in the repo root describing:
   - How to build and run the contract, the backend, and the web app.
   - Any design or trade-off decisions you made.
   - What you would improve with more time.

## Submission

- Create a **public** Git repository (e.g. on GitHub).
- Push your solution to that repository (you may copy this assessment content into a new repo or fork and push your changes).
- Share the **GitHub link** to your repo as instructed in your application (e.g. in the job application form or via the contact provided).

## Questions

If anything is unclear, email the contact provided in your application. We’re happy to clarify requirements or tooling.

Good luck, and we look forward to seeing your work.

— DecryptCode INC Engineering
