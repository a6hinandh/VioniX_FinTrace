import { useMemo } from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export interface FlowNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  amount: string;
}

export interface FundFlowGraphProps {
  nodes: FlowNode[];
  edges: FlowEdge[];
  highlightedPath?: string[];
  className?: string;
}

export function FundFlowGraph({ nodes, edges, highlightedPath = [], className = '' }: FundFlowGraphProps) {
  const nodeMap = useMemo(() => {
    const map = new Map<string, FlowNode>();
    nodes.forEach((node) => map.set(node.id, node));
    return map;
  }, [nodes]);

  const isNodeHighlighted = (id: string) => highlightedPath.includes(id);

  const isEdgeHighlighted = (sourceId: string, targetId: string) => {
    const idx = highlightedPath.indexOf(sourceId);
    return idx !== -1 && highlightedPath[idx + 1] === targetId;
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ background: 'var(--color-surface-0)', border: '1px solid var(--color-border)' }}>
      <div className="absolute inset-0 landing-grid opacity-30 pointer-events-none" />

      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <marker id="arrow-normal" markerWidth="10" markerHeight="10" refX="26" refY="5" orient="auto">
            <path d="M0,0 L0,10 L10,5 z" fill="rgba(16,185,129,0.55)" />
          </marker>
          <marker id="arrow-highlighted" markerWidth="12" markerHeight="12" refX="22" refY="6" orient="auto">
            <path d="M0,0 L0,12 L12,6 z" fill="rgba(239,68,68,1)" />
          </marker>
        </defs>

        {edges.map((edge) => {
          const src = nodeMap.get(edge.source);
          const tgt = nodeMap.get(edge.target);
          if (!src || !tgt) return null;

          const highlighted = isEdgeHighlighted(edge.source, edge.target);

          return (
            <line
              key={edge.id}
              x1={`${src.x}%`}
              y1={`${src.y}%`}
              x2={`${tgt.x}%`}
              y2={`${tgt.y}%`}
              stroke={highlighted ? 'var(--color-risk)' : 'var(--color-safe)'}
              strokeWidth={highlighted ? 3 : 1.8}
              strokeOpacity={highlighted ? 1 : 0.5}
              strokeDasharray={highlighted ? 'none' : '5 4'}
              markerEnd={highlighted ? 'url(#arrow-highlighted)' : 'url(#arrow-normal)'}
            />
          );
        })}
      </svg>

      {edges.map((edge) => {
        const src = nodeMap.get(edge.source);
        const tgt = nodeMap.get(edge.target);
        if (!src || !tgt) return null;

        const highlighted = isEdgeHighlighted(edge.source, edge.target);
        const midX = (src.x + tgt.x) / 2;
        const midY = (src.y + tgt.y) / 2;

        return (
          <div
            key={`label-${edge.id}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded text-[10px] font-bold"
            style={{
              left: `${midX}%`,
              top: `${midY}%`,
              color: highlighted ? 'var(--color-risk)' : 'var(--color-text-secondary)',
              background: 'var(--color-surface-1)',
              border: `1px solid ${highlighted ? 'var(--color-risk-border)' : 'var(--color-border)'}`,
            }}
          >
            {edge.amount}
          </div>
        );
      })}

      {nodes.map((node) => {
        const highlighted = isNodeHighlighted(node.id);
        return (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              color: highlighted ? 'var(--color-risk)' : 'var(--color-safe)',
              background: 'var(--color-surface-1)',
              borderColor: highlighted ? 'var(--color-risk)' : 'var(--color-safe)',
              boxShadow: highlighted ? 'var(--shadow-glow-risk)' : '0 0 16px rgba(16,185,129,0.2)',
              zIndex: highlighted ? 20 : 10,
            }}
          >
            {highlighted ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            <span className="text-[10px] font-bold font-mono mt-0.5">{node.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function FundFlowDemo() {
  const mockNodes: FlowNode[] = [
    { id: 'A', label: 'ACC-A', x: 13, y: 52 },
    { id: 'B', label: 'ACC-B', x: 35, y: 28 },
    { id: 'C', label: 'ACC-C', x: 58, y: 32 },
    { id: 'D', label: 'ACC-D', x: 84, y: 52 },
    { id: 'E', label: 'ACC-E', x: 36, y: 76 },
  ];

  const mockEdges: FlowEdge[] = [
    { id: 'e1', source: 'A', target: 'B', amount: '₹8.5L' },
    { id: 'e2', source: 'B', target: 'C', amount: '₹8.45L' },
    { id: 'e3', source: 'C', target: 'D', amount: '₹8.4L' },
    { id: 'e4', source: 'A', target: 'E', amount: '₹52K' },
  ];

  return (
    <div className="card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>Fund-Flow Network</h3>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
          style={{ background: 'var(--color-risk-muted)', color: 'var(--color-risk)', border: '1px solid var(--color-risk-border)' }}>
          A to B to C to D flagged
        </span>
      </div>
      <FundFlowGraph
        nodes={mockNodes}
        edges={mockEdges}
        highlightedPath={['A', 'B', 'C', 'D']}
        className="w-full h-72"
      />
    </div>
  );
}
