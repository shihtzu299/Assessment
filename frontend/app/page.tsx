import { CounterWidget } from "@/components/CounterWidget";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold mb-6">Counter dApp</h1>
      <CounterWidget />
    </main>
  );
}
