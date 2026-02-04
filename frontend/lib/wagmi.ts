"use client";

import { createConfig, http } from "wagmi";
import { hardhat } from "wagmi/chains";
import { getContractAddress } from "./contract";

const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? "31337", 10);

// Local Hardhat chain config (matches hardhat node)
const localhost = {
  ...hardhat,
  id: chainId,
  name: "Localhost",
  nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
  },
};

export const config = createConfig({
  chains: [localhost],
  transports: {
    [localhost.id]: http(),
  },
});
