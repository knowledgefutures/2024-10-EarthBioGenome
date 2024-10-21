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
						<TableHead>Common Name</TableHead>
						<TableHead className="">Species</TableHead>
						<TableHead>DOI</TableHead>
						<TableHead>NCBI TaxID</TableHead>
						<TableHead className="text-right">QV</TableHead>
						{/* <TableHead className="text-right">Assembly Percent</TableHead> */}
					</TableRow>
				</TableHeader>
				<TableBody>
					{genomes.map((genome, index) => {
						return (
							<TableRow
								key={genome.id}
								className={index % 2 === 0 ? '' : 'bg-muted/40'}
							>
								<TableCell className="font-medium">
									<a href={`/genome/${genome.slug}`}>{genome.commonName}</a>
								</TableCell>
								<TableCell className="italic">
									<a href={`/genome/${genome.slug}`}>{genome.species}</a>
								</TableCell>
								<TableCell>
									<a href={`https://dx.doi.org`}>{genome.genomeNote.DOI}</a>
								</TableCell>
								<TableCell>
									<a
										href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${genome.ncbiTaxId}`}
									>
										{genome.ncbiTaxId}
									</a>
								</TableCell>
								<TableCell className="text-right">{genome.genomeNote.QV}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
};

export default GenomeTable;
