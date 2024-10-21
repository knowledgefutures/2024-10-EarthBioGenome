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
import WorkfowNode from '~/components/WorkflowNode';

import '@xyflow/react/dist/style.css';
import { Button } from './ui/button';

/* prettier-ignore */
const initialNodes = 
[
    { type: "workflowNode", id: "1", position: { "x": 0, "y": 0 }, data: { label: "Genome Note Submitted through Site" },},
    { type: "workflowNode", id: "2", position: { "x": 274, "y": 0 }, data: { label: "XML import" },},
    { type: "workflowNode", id: "3", position: { "x": 548, "y": 0 }, data: { label: "API sync from Antarctic Genome Journal" },},
    { type: "workflowNode", id: "4", position: { "x": 274, "y": 114 }, data: { label: "Initial Screening" },},
    { type: "workflowNode", id: "5", position: { "x": 274, "y": 228 }, data: { label: "Pull metadata from NCBI" },},
    { type: "workflowNode", id: "6", position: { "x": 274, "y": 342 }, data: { label: "Pull metadata from GoaT" },},
    { type: "workflowNode", id: "7", position: { "x": 274, "y": 456 }, data: { label: "Run through Universal Genome Note Engine" },},
    { type: "workflowNode", id: "8", position: { "x": 137, "y": 570 }, data: { label: "Produce technical review " },},
    { type: "workflowNode", id: "9", position: { "x": 411, "y": 570 }, data: { label: "Submit to reviewer pool" },},
    { type: "workflowNode", id: "10", position: { "x": 137, "y": 684 }, data: { label: "Generate DOI" },},
    { type: "workflowNode", id: "11", position: { "x": 0, "y": 798 }, data: { label: "Push to public site" },},
    { type: "workflowNode", id: "12", position: { "x": 274, "y": 798 }, data: { label: "Submit to registry "},}
];

type Node = {
	type: string;
	id: string;
	position: { x: number; y: number };
	data: { label: string };
	measured?: { width: number; height: number };
};

const initialEdges = [
	{ id: 'e1-4', source: '1', target: '4' },
	{ id: 'e2-4', source: '2', target: '4' },
	{ id: 'e3-4', source: '3', target: '4' },
	{ id: 'e4-5', source: '4', target: '5' },
	{ id: 'e5-6', source: '5', target: '6' },
	{ id: 'e6-7', source: '6', target: '7' },
	{ id: 'e7-8', source: '7', target: '8' },
	{ id: 'e7-9', source: '7', target: '9' },
	{ id: 'e8-10', source: '8', target: '10' },
	{ id: 'e10-11', source: '10', target: '11' },
	{ id: 'e10-12', source: '10', target: '12' },
];

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

function ReactFlowGrid() {
	const { fitView } = useReactFlow();

	const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
	const nodeTypes = useMemo(() => ({ workflowNode: WorkfowNode }), []);
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
		<div className="-ml-6 w-[calc(100%+48px)] -mt-6 -mb-6 h-screen">
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
					<Button variant="outline" onClick={() => onLayout('TB')}>
						Auto-Layout
					</Button>
					{/* <button onClick={() => onLayout('LR')}>horizontal layout</button> */}
				</Panel>
			</ReactFlow>
		</div>
	);
}

export default function WorkflowGrid() {
	return (
		<ReactFlowProvider>
			<ReactFlowGrid />
		</ReactFlowProvider>
	);
}