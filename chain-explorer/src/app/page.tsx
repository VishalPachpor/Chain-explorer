import { GraphCanvas } from '@/components/GraphCanvas';
import { SearchBar } from '@/components/SearchBar';
import { NodeDetails } from '@/components/NodeDetails';
import { WalletButton } from '@/components/WalletButton';

export default function Home() {
  return (
    <main className="h-screen w-screen bg-[#0a0a0f] overflow-hidden relative">
      <SearchBar />
      <WalletButton />
      <GraphCanvas />
      <NodeDetails />
    </main>
  );
}
