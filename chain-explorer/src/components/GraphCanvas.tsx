'use client';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useGraphStore } from '@/stores/graphStore';
import { GraphNode } from '@/types/graph';

// Dynamic import to avoid SSR issues with Three.js
const ForceGraph3DComponent = dynamic(() => import('./ForceGraph3D'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-screen bg-[#0a0a0f]">
            <div className="text-white">Loading graph...</div>
        </div>
    ),
});

const ForceGraph2DComponent = dynamic(() => import('./ForceGraph2D'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-screen bg-[#0a0a0f]">
            <div className="text-white">Loading graph...</div>
        </div>
    ),
});

export function GraphCanvas() {
    const isMobile = useIsMobile();
    const { graph, expandNode, selectNode } = useGraphStore();

    const handleNodeClick = (node: GraphNode) => {
        selectNode(node);
        expandNode(node.id);
    };

    if (graph.nodes.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#0a0a0f]">
                <div className="text-gray-500 text-center">
                    <p className="text-xl mb-2">No graph data</p>
                    <p className="text-sm">Enter an address or ENS name above</p>
                </div>
            </div>
        );
    }

    return isMobile ? (
        <ForceGraph2DComponent graphData={graph} onNodeClick={handleNodeClick} />
    ) : (
        <ForceGraph3DComponent graphData={graph} onNodeClick={handleNodeClick} />
    );
}
