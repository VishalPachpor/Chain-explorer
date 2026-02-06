'use client';
import { useState, KeyboardEvent } from 'react';
import { useGraphStore } from '@/stores/graphStore';

export function SearchBar() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { initGraph, expandNode } = useGraphStore();

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
                await expandNode(data.address);
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
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-full max-w-md px-4">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter wallet address or ENS..."
                    className="flex-1 px-4 py-3 rounded-xl bg-gray-900/90 backdrop-blur-sm border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loading}
                />
                <button
                    onClick={handleSearch}
                    disabled={loading || !query.trim()}
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {loading ? (
                        <span className="inline-block animate-spin">⟳</span>
                    ) : (
                        'Explore'
                    )}
                </button>
            </div>
            {error && (
                <p className="mt-2 text-red-400 text-sm text-center">{error}</p>
            )}
        </div>
    );
}
