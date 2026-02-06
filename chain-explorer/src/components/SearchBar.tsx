'use client';
import { useState, KeyboardEvent } from 'react';
import { useGraphStore } from '@/stores/graphStore';
import { useChainId } from 'wagmi';

export function SearchBar() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { initGraph, expandNode } = useGraphStore();
    const chainId = useChainId(); // Get connected wallet's chainId

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}`);
            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else if (data.address) {
                initGraph(data.address);
                await expandNode(data.address, chainId ?? 1); // Fallback to Ethereum Mainnet
                setQuery('');
            }
        } catch (err) {
            setError('Search failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="w-full max-w-md transition-all">
            <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search address or ENS..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-full bg-gray-900/60 backdrop-blur-xl border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-gray-900/80 transition-all shadow-lg text-sm sm:text-base font-medium"
                    disabled={loading}
                />
                {loading && (
                    <div className="absolute inset-y-0 right-4 flex items-center">
                        <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-2 text-red-400 text-xs text-center font-medium bg-red-900/20 py-1 px-3 rounded-full mx-auto w-fit border border-red-900/30">{error}</p>
            )}
        </div>
    );
}
