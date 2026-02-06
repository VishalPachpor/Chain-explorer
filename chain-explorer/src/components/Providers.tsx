'use client';

import React from 'react';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, base, arbitrum, optimism, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

import { cookieStorage, createStorage } from 'wagmi';

import { http } from 'wagmi';

const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

const config = getDefaultConfig({
    appName: 'Chain Explorer',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
    chains: [mainnet, base, arbitrum, optimism, polygon],
    transports: {
        [mainnet.id]: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyId}`),
        [base.id]: http(`https://base-mainnet.g.alchemy.com/v2/${alchemyId}`),
        [arbitrum.id]: http(`https://arb-mainnet.g.alchemy.com/v2/${alchemyId}`),
        [optimism.id]: http(`https://opt-mainnet.g.alchemy.com/v2/${alchemyId}`),
        [polygon.id]: http(`https://polygon-mainnet.g.alchemy.com/v2/${alchemyId}`),
    },
    ssr: false,
    storage: createStorage({
        storage: cookieStorage,
    }),
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {mounted && children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
