import { Handle, Position } from '@xyflow/react';

export default function CoauthorNode({ data }: { data: { label: string } }) {
	return (
		<>
			<div className="p-2 whitespace-nowrap border border-neutral-300 bg-neutral-100 rounded truncate text-center">
				{data.label}
			</div>
			<Handle type="target" position={Position.Left} id="a" className="opacity-0" />
			<Handle type="source" position={Position.Right} id="b" className="opacity-0" />
		</>
	);
}
