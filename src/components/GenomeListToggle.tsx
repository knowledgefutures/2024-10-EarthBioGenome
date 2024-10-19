import React from 'react';
import { useStore } from '@nanostores/react';
import { $genomeListMode } from '~/data/stores';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import { TableProperties, StretchHorizontal } from 'lucide-react';

type Props = {};

const GenomeListToggle: React.FC<Props> = ({}) => {
	const genomeListMode = useStore($genomeListMode);

	return (
		<ToggleGroup
			type="single"
			value={genomeListMode}
			onValueChange={(newVal) => {
				if (newVal) {
					$genomeListMode.set(newVal);
				}
			}}
			className="border rounded"
		>
			<ToggleGroupItem value="cards">
				<StretchHorizontal size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="table">
				<TableProperties size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	);
};

export default GenomeListToggle;
