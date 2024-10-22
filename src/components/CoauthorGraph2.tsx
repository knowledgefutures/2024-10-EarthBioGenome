import type { Genome, CoauthorContributor } from '~/types/pubs';
import { useCallback, useMemo } from 'react';
import Dagre from '@dagrejs/dagre';
import {
	ReactFlow,
	Controls,
	Background,
	BackgroundVariant,
	useNodesState,
	useEdgesState,
	addEdge,
	Panel,
	useReactFlow,
	ReactFlowProvider,
} from '@xyflow/react';
import CoauthorNode from '~/components/CoauthorNode';

import '@xyflow/react/dist/style.css';
import { Button } from './ui/button';

type Props = {
	coauthorContributors: CoauthorContributor[];
};

type Node = {
	type: string;
	id: string;
	position: { x: number; y: number };
	data: { label: string };
	measured?: { width: number; height: number };
};
type Edge = {
	id: string;
	source: string;
	target: string;
};
const getLayoutedElements = (nodes: Node[], edges: Edge[], options: any) => {
	const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
	g.setGraph({ rankdir: options.direction });

	edges.forEach((edge) => g.setEdge(edge.source, edge.target));
	nodes.forEach((node) =>
		g.setNode(node.id, {
			...node,
			width: node.measured?.width ?? 0,
			height: node.measured?.height ?? 0,
		})
	);

	Dagre.layout(g);
	return {
		nodes: nodes.map((node) => {
			const position = g.node(node.id);
			// We are shifting the dagre node position (anchor=center center) to the top left
			// so it matches the React Flow node anchor point (top left).
			const x = position.x - (node.measured?.width ?? 0) / 2;
			const y = position.y - (node.measured?.height ?? 0) / 2;

			return { ...node, position: { x, y } };
		}),
		edges,
	};
};

const AuthorFlow: React.FC<Props> = ({ coauthorContributors }) => {
	const { fitView } = useReactFlow();
	const authors = coauthorContributors.map((coauthorContributor) => {
		return coauthorContributor.author;
	});
	const authorNodes = authors.map((author, index) => {
		return {
			type: 'workflowNode',
			id: author.id,
			position: { x: 0, y: index * 50 },
			data: { label: author.name },
		};
	});
	const genomes = coauthorContributors
		.flatMap((coauthorContributor) => coauthorContributor.genomes)
		.reduce((acc: Genome[], genome) => {
			if (!acc.some((g) => g.id === genome.id)) {
				acc.push(genome);
			}
			return acc;
		}, []);
	const genomeNodes = genomes.map((genome, index) => {
		return {
			type: 'workflowNode',
			id: genome.id,
			position: { x: 400, y: index * 50 },
			data: { label: genome.commonName },
		};
	});
	const initialNodes = [...authorNodes, ...genomeNodes];
	const initialEdges = coauthorContributors.flatMap((coauthorContributor) => {
		const authorId = coauthorContributor.authorId;
		const genomeIds = coauthorContributor.genomes.map((genome) => genome.id);
		const edgeArray = genomeIds.map((genomeId) => {
			return { id: `id-${authorId}-${genomeId}`, source: authorId, target: genomeId };
		});
		return edgeArray;
	});
	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const nodeTypes = useMemo(() => ({ workflowNode: CoauthorNode }), []);
	const onConnect = useCallback(
		(params: any) => setEdges((eds) => addEdge(params, eds)),
		[setEdges]
	);
	const onLayout = useCallback(
		(direction: string) => {
			const layouted = getLayoutedElements(nodes, edges, { direction });

			setNodes([...layouted.nodes]);
			setEdges([...layouted.edges]);

			window.requestAnimationFrame(() => {
				fitView();
			});
		},
		[nodes, edges]
	);
	return (
		<div className="w-full h-[600px]">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				fitView
			>
				<Controls />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
				<Panel position="top-right">
					<Button variant="outline" onClick={() => onLayout('LR')}>
						Auto-Layout
					</Button>
					{/* <button onClick={() => onLayout('LR')}>horizontal layout</button> */}
				</Panel>
			</ReactFlow>
		</div>
	);
};

// const AuthorFlow: React.FC<Props> = ({ coauthorContributors }) => {
export default function CoauthorGraph2({ coauthorContributors }: Props) {
	return (
		<ReactFlowProvider>
			<AuthorFlow coauthorContributors={coauthorContributors} />
		</ReactFlowProvider>
	);
}
