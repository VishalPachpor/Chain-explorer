'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletButton() {
    return (
        <div className="z-20">
            <ConnectButton
                accountStatus="avatar"
                chainStatus="icon"
                showBalance={false}
            />
        </div>
    );
}
