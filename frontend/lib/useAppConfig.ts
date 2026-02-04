"use client";

import { useState, useEffect } from "react";

export type AppConfig = {
  contractAddress: `0x${string}`;
  chainId: number;
} | null;

type State =
  | { status: "loading" }
  | { status: "ready"; config: AppConfig }
  | { status: "error"; message: string };

/**
 * Returns dApp config: contract address and chain ID.
 * If NEXT_PUBLIC_API_URL is set, fetches from backend GET /api/config.
 * Otherwise uses NEXT_PUBLIC_CONTRACT_ADDRESS and NEXT_PUBLIC_CHAIN_ID from env.
 */
export function useAppConfig(): State {
  const [state, setState] = useState<State>({ status: "loading" });
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (apiUrl) {
      fetch(`${apiUrl}/api/config`)
        .then((res) => {
          if (!res.ok) throw new Error(res.status === 503 ? "Backend: contract address not configured" : `HTTP ${res.status}`);
          return res.json();
        })
        .then((data: { contractAddress: string; chainId: number }) => {
          setState({
            status: "ready",
            config: {
              contractAddress: data.contractAddress as `0x${string}`,
              chainId: data.chainId,
            },
          });
        })
        .catch((err) => {
          setState({ status: "error", message: err.message ?? "Failed to load config from backend" });
        });
    } else {
      const addr = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? "31337", 10);
      setState({
        status: "ready",
        config: addr ? { contractAddress: addr as `0x${string}`, chainId } : null,
      });
    }
  }, [apiUrl]);

  return state;
}
