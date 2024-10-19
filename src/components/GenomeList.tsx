import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { $genomeListMode } from '~/data/stores';
import type { PopulatedGenome } from '~/types/pubs';
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '~/components/ui/pagination';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table';
import { TableProperties, StretchHorizontal } from 'lucide-react';
import GenomeCard from '~/components/GenomeCard';

type Props = {
	genomes: PopulatedGenome[];
};

const GenomeList: React.FC<Props> = ({ genomes }) => {
	// const [mode, setMode] = useState('cards');
	const genomeListMode = useStore($genomeListMode);
	const pageNumber = window.location.search;
	console.log(pageNumber)
	return (
		<div>
			<div className="flex justify-between items-center mb-8">
				<div className="font-bold">{genomes.length} Genome Notes</div>
				<div className="flex space-x-4">
					<div>
						<Pagination>
							<PaginationContent>
								<PaginationItem>
									<PaginationPrevious href="#" />
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href={window.location.pathname}>1</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationLink href="?page=2">2</PaginationLink>
								</PaginationItem>
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
								<PaginationItem>
									<PaginationNext href="#" />
								</PaginationItem>
							</PaginationContent>
						</Pagination>
					</div>
					<div>
						<ToggleGroup
							type="single"
							value={genomeListMode}
							onValueChange={(newVal) => {
								$genomeListMode.set(newVal);
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
					</div>
				</div>
			</div>
			{genomeListMode === 'cards' &&
				genomes.map((genome) => {
					return (
						<div key={genome.id} className="mb-4">
							<GenomeCard genome={genome} />
						</div>
					);
				})}
			{genomeListMode === 'table' && (
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
											<a href={`/genome/${genome.slug}`}>
												{genome.commonName}
											</a>
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
			)}
		</div>
	);
};

export default GenomeList;
