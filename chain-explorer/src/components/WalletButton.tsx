'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletButton() {
    return (
        <div className="absolute top-4 right-4 z-20">
            <ConnectButton
                accountStatus="avatar"
                chainStatus="icon"
                showBalance={false}
            />
        </div>
    );
}
