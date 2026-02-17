"use client";
import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { COUNTER_ABI } from "@/lib/contract";
import { useAppConfig } from "@/lib/useAppConfig";

export function CounterWidget() {
  const { address, isConnected } = useAccount();
  const {
    connect,
    connectors,
    isPending: isConnectPending,
    error: connectError,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const configState = useAppConfig();

  const contractAddress =
    configState.status === "ready"
      ? (configState.config?.contractAddress ?? null)
      : null;

  // Read current counter value from contract
  const { data: count, refetch: refetchCount } = useReadContract({
    address: contractAddress ?? undefined,
    abi: COUNTER_ABI,
    functionName: "getCount",
  });

  // Transaction hooks for increment / decrement
  const {
    writeContract: writeIncrement,
    isPending: isIncrementPending,
    data: incrementTxHash,
  } = useWriteContract();

  const {
    writeContract: writeDecrement,
    isPending: isDecrementPending,
    data: decrementTxHash,
  } = useWriteContract();

  /**
   * WAIT FOR TRANSACTION RECEIPTS
   * ------------------------------------------------------
   * We listen for blockchain confirmations here.
   * Once a tx succeeds, we will refresh the counter value.
   *
   * NOTE:
   * Earlier versions attempted to use `onSuccess` directly
   * in this hook, but wagmi types in this project do not
   * support that callback. Instead we watch `isSuccess`
   * and react via useEffect below.
   */
  const { isLoading: isIncrementMining, isSuccess: isIncrementSuccess } =
    useWaitForTransactionReceipt({
      hash: incrementTxHash,
    });

  const { isLoading: isDecrementMining, isSuccess: isDecrementSuccess } =
    useWaitForTransactionReceipt({
      hash: decrementTxHash,
    });

  /**
   * AUTO REFRESH AFTER TRANSACTION
   * ------------------------------------------------------
   * When either transaction finishes successfully,
   * we refetch the contract state so UI updates automatically.
   *
   * Without this, the user would need to refresh the page.
   */
  useEffect(() => {
    if (isIncrementSuccess || isDecrementSuccess) {
      refetchCount();
    }
  }, [isIncrementSuccess, isDecrementSuccess, refetchCount]);

  // Pending states (wallet confirmation or mining)
  const isTxPending = isIncrementPending || isDecrementPending;
  const isMining = isIncrementMining || isDecrementMining;

  /**
   * UX IMPROVEMENT: prevent decrement at 0
   * ------------------------------------------------------
   * Contract reverts when count is 0.
   * We disable the decrement button to avoid unnecessary errors.
   *
   * wagmi returns bigint values (e.g. 0n)
   */
  const isZero = count === 0n;

  if (configState.status === "loading") {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-600">
        Loading config…
      </div>
    );
  }

  if (configState.status === "error") {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-800">
        <p className="font-medium">Config error</p>
        <p className="mt-2 text-sm">{configState.message}</p>
        <p className="mt-2 text-sm">
          Ensure the backend is running and CONTRACT_ADDRESS is set, or use
          NEXT_PUBLIC_CONTRACT_ADDRESS in .env.
        </p>
      </div>
    );
  }

  if (!contractAddress) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-800">
        <p className="font-medium">Contract address not set</p>
        <p className="mt-2 text-sm">
          Set <code>NEXT_PUBLIC_CONTRACT_ADDRESS</code> in .env, or run the
          backend with <code>CONTRACT_ADDRESS</code> and set{" "}
          <code>NEXT_PUBLIC_API_URL</code> (e.g. http://localhost:4000).
        </p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-gray-600">Connect your wallet to use the counter.</p>
        {connectors.map((c) => (
          <button
            key={c.uid}
            onClick={() => connect({ connector: c })}
            disabled={isConnectPending}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isConnectPending ? "Connecting…" : `Connect ${c.name}`}
          </button>
        ))}
        {connectError && (
          <p className="text-sm text-red-600">{connectError.message}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">
        Connected: {address?.slice(0, 6)}…{address?.slice(-4)}
      </p>

      <button
        onClick={() => disconnect()}
        className="text-sm text-gray-500 underline hover:text-gray-700"
      >
        Disconnect
      </button>

      <p className="text-3xl font-mono font-semibold">
        Count: {count !== undefined ? String(count) : "—"}
      </p>

      <div className="flex gap-3">
        {/* Increment button */}
        <button
          onClick={() =>
            writeIncrement({
              address: contractAddress!,
              abi: COUNTER_ABI,
              functionName: "increment",
            })
          }
          disabled={isTxPending || isMining}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {isIncrementPending
            ? "Confirm…"
            : isIncrementMining
              ? "Mining…"
              : "Increment"}
        </button>

        {/* Decrement button (disabled when count is zero) */}
        <button
          onClick={() =>
            writeDecrement({
              address: contractAddress!,
              abi: COUNTER_ABI,
              functionName: "decrement",
            })
          }
          disabled={isTxPending || isMining || isZero}
          title={isZero ? "Count is already 0" : ""}
          className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
        >
          {isDecrementPending
            ? "Confirm…"
            : isDecrementMining
              ? "Mining…"
              : "Decrement"}
        </button>
      </div>
    </div>
  );
}
