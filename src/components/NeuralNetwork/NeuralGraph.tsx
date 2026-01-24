import { useRef, useEffect, useState } from 'react';
import { useNeuralGraph } from './useNeuralGraph';

interface NeuralGraphProps {
    className?: string;
}

export function NeuralGraph({ className }: NeuralGraphProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // We need dimensions to scale the normalized coordinates (0-100)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const { nodes, edges, hoveredNodeId, handleMouseMove, handleClick } = useNeuralGraph(dimensions.width, dimensions.height);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            if (!dimensions.width || !dimensions.height) return;

            canvas.width = dimensions.width;
            canvas.height = dimensions.height;

            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear

            // Scale factors (Coordinates are 0-100)
            const sx = canvas.width / 100;
            const sy = canvas.height / 100;

            // Draw Edges
            edges.forEach(edge => {
                const source = nodes.find(n => n.id === edge.source);
                const target = nodes.find(n => n.id === edge.target);
                if (!source || !target) return;

                const x1 = source.x * sx;
                const y1 = source.y * sy;
                const x2 = target.x * sx;
                const y2 = target.y * sy;

                // Highlight connected edges if node is hovered
                const dataActive = hoveredNodeId && (edge.source === hoveredNodeId || edge.target === hoveredNodeId);

                // Base line
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = dataActive
                    ? 'rgba(0, 255, 65, 0.4)'
                    : `rgba(0, 243, 255, ${0.1 + edge.activity * 0.5})`;
                ctx.lineWidth = dataActive ? 2 : (1 + edge.activity * 2);
                ctx.stroke();

                // Signal packet
                if (edge.activity > 0.1) {
                    // ...
                }
            });

            // Draw Nodes
            nodes.forEach(node => {
                const x = node.x * sx;
                const y = node.y * sy;
                const isHovered = hoveredNodeId === node.id;

                const gradient = ctx.createRadialGradient(x, y, 0, x, y, node.radius * sx * 0.5);
                if (node.type === 'output') {
                    gradient.addColorStop(0, '#00ff41');
                    gradient.addColorStop(1, 'rgba(0, 255, 65, 0.2)');
                } else if (node.type === 'input') {
                    gradient.addColorStop(0, '#666');
                    gradient.addColorStop(1, 'rgba(100, 100, 100, 0.1)');
                } else { // hidden
                    gradient.addColorStop(0, '#00f3ff');
                    gradient.addColorStop(1, 'rgba(0, 243, 255, 0.1)');
                }

                ctx.beginPath();
                // Scale radius slightly on hover
                const r = node.radius * (window.innerWidth < 768 ? 4 : 6) * (isHovered ? 1.2 : 1);
                ctx.arc(x, y, r, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Label
                if (node.label) {
                    ctx.font = '12px "Press Start 2P", monospace';
                    ctx.fillStyle = isHovered ? '#00ff41' : '#fff';
                    ctx.fillText(node.label, x + 15, y + 5);
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions, nodes, edges, hoveredNodeId]); // Re-bind when visual state changes slightly, though ref based animation handles most. Hover needs reactive re-render or ref check.

    const onMouseMove = (e: React.MouseEvent) => {
        // Check if bounds valid
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        handleMouseMove(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onMouseLeave = () => {
        // Reset hover? Logic could support this
    };

    return (
        <div
            ref={containerRef}
            className={`w-full h-full relative ${className}`}
            onMouseMove={onMouseMove}
            onClick={handleClick}
            onMouseLeave={onMouseLeave}
            role="application"
            aria-label="Interactive Neural Network Navigation"
        >
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
