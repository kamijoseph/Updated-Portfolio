import { useRef, useEffect, useState, useCallback } from 'react';

export interface Node {
    id: string;
    x: number;
    y: number;
    label: string;
    type: 'input' | 'hidden' | 'output';
    vx: number;
    vy: number;
    radius: number;
}

export interface Edge {
    source: string;
    target: string;
    weight: number;
    activity: number; // 0 to 1, for signal pulsing
}

const INITIAL_NODES: Node[] = [
    // Input Layer (Left/Top)
    { id: 'n1', x: 20, y: 30, label: 'Data', type: 'input', vx: 0, vy: 0, radius: 4 },
    { id: 'n2', x: 20, y: 50, label: 'Code', type: 'input', vx: 0, vy: 0, radius: 4 },
    { id: 'n3', x: 20, y: 70, label: 'Math', type: 'input', vx: 0, vy: 0, radius: 4 },

    // Hidden Layer 1 (Center-Left)
    { id: 'h1', x: 40, y: 25, label: '', type: 'hidden', vx: 0, vy: 0, radius: 3 },
    { id: 'h2', x: 40, y: 40, label: '', type: 'hidden', vx: 0, vy: 0, radius: 3 },
    { id: 'h3', x: 40, y: 60, label: '', type: 'hidden', vx: 0, vy: 0, radius: 3 },
    { id: 'h4', x: 40, y: 75, label: '', type: 'hidden', vx: 0, vy: 0, radius: 3 },

    // Hidden Layer 2 (Center-Right)
    { id: 'h5', x: 60, y: 30, label: '', type: 'hidden', vx: 0, vy: 0, radius: 3 },
    { id: 'h6', x: 60, y: 50, label: '', type: 'hidden', vx: 0, vy: 0, radius: 3 },
    { id: 'h7', x: 60, y: 70, label: '', type: 'hidden', vx: 0, vy: 0, radius: 3 },

    // Output Layer (Right/Nav Items)
    { id: 'about', x: 80, y: 20, label: 'About', type: 'output', vx: 0, vy: 0, radius: 6 },
    { id: 'projects', x: 80, y: 40, label: 'Projects', type: 'output', vx: 0, vy: 0, radius: 6 },
    { id: 'resume', x: 80, y: 60, label: 'Resume', type: 'output', vx: 0, vy: 0, radius: 6 },
    { id: 'contact', x: 80, y: 80, label: 'Contact', type: 'output', vx: 0, vy: 0, radius: 6 },
];

const INITIAL_EDGES: Edge[] = [
    // Fully connected Input -> Hidden 1
    { source: 'n1', target: 'h1', weight: 0.5, activity: 0 }, { source: 'n1', target: 'h2', weight: 0.5, activity: 0 },
    { source: 'n2', target: 'h2', weight: 0.5, activity: 0 }, { source: 'n2', target: 'h3', weight: 0.5, activity: 0 },
    { source: 'n3', target: 'h3', weight: 0.5, activity: 0 }, { source: 'n3', target: 'h4', weight: 0.5, activity: 0 },

    // Hidden 1 -> Hidden 2 (Sparse)
    { source: 'h1', target: 'h5', weight: 0.5, activity: 0 }, { source: 'h1', target: 'h6', weight: 0.5, activity: 0 },
    { source: 'h2', target: 'h5', weight: 0.5, activity: 0 }, { source: 'h2', target: 'h7', weight: 0.5, activity: 0 },
    { source: 'h3', target: 'h6', weight: 0.5, activity: 0 }, { source: 'h3', target: 'h7', weight: 0.5, activity: 0 },
    { source: 'h4', target: 'h6', weight: 0.5, activity: 0 },

    // Hidden 2 -> Output
    { source: 'h5', target: 'about', weight: 0.8, activity: 0 },
    { source: 'h6', target: 'projects', weight: 0.8, activity: 0 },
    { source: 'h7', target: 'resume', weight: 0.8, activity: 0 },
    { source: 'h7', target: 'contact', weight: 0.8, activity: 0 },
    { source: 'h5', target: 'projects', weight: 0.2, activity: 0 },
];

export function useNeuralGraph(width: number, height: number) {
    const nodesRef = useRef<Node[]>(JSON.parse(JSON.stringify(INITIAL_NODES)));
    const edgesRef = useRef<Edge[]>(JSON.parse(JSON.stringify(INITIAL_EDGES)));
    const requestRef = useRef<number>(0);
    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

    const handleMouseMove = useCallback((x: number, y: number) => {
        // Convert screen coordinates to normalized coordinates (0-100)
        const nx = (x / width) * 100;
        const ny = (y / height) * 100;

        // Find closest node within radius
        let found = null;
        for (const node of nodesRef.current) {
            // Simple distance check. Adjust buffer as needed.
            const dist = Math.sqrt(Math.pow(node.x - nx, 2) + Math.pow(node.y - ny, 2));
            // Radius is in normalized units. Add some buffer.
            if (dist < node.radius + 2) {
                found = node.id;
                break;
            }
        }
        setHoveredNodeId(found);
    }, [width, height]);

    const handleClick = useCallback(() => {
        if (hoveredNodeId) {
            // Trigger navigation
            const node = nodesRef.current.find(n => n.id === hoveredNodeId);
            if (node && node.type === 'output') {
                const section = document.getElementById(node.id);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                } else if (node.id === 'resume') {
                    window.open('/resume.pdf', '_blank');
                }
            }
        }
    }, [hoveredNodeId]);

    // Update Physics / Animation
    useEffect(() => {
        const animate = () => {
            const nodes = nodesRef.current;
            const edges = edgesRef.current;

            // Random stochastic activation
            if (Math.random() < 0.05) {
                // Trigger a signal in an input node
                const inputNodes = nodes.filter(n => n.type === 'input');
                const source = inputNodes[Math.floor(Math.random() * inputNodes.length)];
                // Find connected edges
                edges.forEach(e => {
                    if (e.source === source.id) e.activity = 1.0;
                });
            }

            // Propagate activity
            edges.forEach(e => {
                if (e.activity > 0) {
                    e.activity -= 0.02; // Decay
                    // If edge is active, potentially activate target node edges?
                    // Simple visual: signal travels along edge
                }
            });

            // Node gentle float
            nodes.forEach(node => {
                node.x += Math.sin(Date.now() / 1000 + node.y) * 0.02;
                node.y += Math.cos(Date.now() / 1000 + node.x) * 0.02;
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [width, height]);

    return {
        nodes: nodesRef.current,
        edges: edgesRef.current,
        hoveredNodeId,
        handleMouseMove,
        handleClick
    };
}
