import { GraphCanvas } from '@/components/GraphCanvas';
import { SearchBar } from '@/components/SearchBar';
import { NodeDetails } from '@/components/NodeDetails';
import { WalletButton } from '@/components/WalletButton';

export default function Home() {
  return (
    <main className="h-screen w-screen bg-[#0a0a0f] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full z-20 pointer-events-none p-4 flex flex-row gap-3 items-start justify-between">
        {/* Search Bar - Flex grow on mobile */}
        <div className="pointer-events-auto flex-1 min-w-0 md:w-auto md:flex-none md:absolute md:left-1/2 md:-translate-x-1/2 md:top-4">
          <SearchBar />
        </div>

        {/* Wallet Button - Fixed width on mobile */}
        <div className="pointer-events-auto flex-none md:absolute md:top-4 md:right-4">
          <WalletButton />
        </div>
      </div>

      <GraphCanvas />
      <NodeDetails />
    </main>
  );
}
