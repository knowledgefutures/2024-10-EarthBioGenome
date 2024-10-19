import React from 'react';
import type { PopulatedGenome } from '~/types/pubs';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table';

type Props = {
	genomes: PopulatedGenome[];
};

const GenomeTable: React.FC<Props> = ({ genomes }) => {
	return (
		<div className="border rounded">
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-white">
						<TableHead className="">Species</TableHead>
						<TableHead>Common Name</TableHead>
						<TableHead>QV</TableHead>
						<TableHead className="text-right">Assembly Percent</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{genomes.map((genome, index) => {
						return (
							<TableRow
								key={genome.id}
								className={index % 2 === 0 ? 'bg-muted/40' : ''}
							>
								<TableCell className="font-medium">
									<a href={`/genome/${genome.slug}`}>{genome.species}</a>
								</TableCell>
								<TableCell>
									<a href={`/genome/${genome.slug}`}>{genome.commonName}</a>
								</TableCell>
								<TableCell>{genome.genomeNote.QV}</TableCell>
								<TableCell className="text-right">
									{genome.genomeNote.assemblyPercent}%
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
};

export default GenomeTable;
