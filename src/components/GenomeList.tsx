import React from 'react';
import { useStore } from '@nanostores/react';
import { $genomeListMode } from '~/data/stores';
import type { PopulatedGenome } from '~/types/pubs';
import GenomeCard from '~/components/GenomeCard';
import GenomeTable from '~/components/GenomeTable';
import GenomePagination from '~/components/GenomePagination';
import GenomeListToggle from './GenomeListToggle';

type Props = {
	genomes: PopulatedGenome[];
};

const GenomeList: React.FC<Props> = ({ genomes }) => {
	const genomeListMode = useStore($genomeListMode);
	const urlParams = new URLSearchParams(window.location.search);
	const pageNumber = urlParams.get('page') ? parseInt(urlParams.get('page') as string, 10) : 1;
	const genomesPerPage = 10;
	const startIndex = (pageNumber - 1) * genomesPerPage;
	const endIndex = startIndex + genomesPerPage;
	const currentGenomes = genomes.slice(startIndex, endIndex);
	const maxPages = Math.ceil(genomes.length / genomesPerPage);
	return (
		<div className="w-full overflow-hidden">
			<div className="flex justify-between items-center mb-8">
				<div className="font-bold">{genomes.length} Genome Notes</div>
				<div className="flex space-x-4">
					{maxPages > 1 && (
						<GenomePagination pageNumber={pageNumber} maxPages={maxPages} />
					)}
					<GenomeListToggle />
				</div>
			</div>
			{genomeListMode === 'cards' &&
				currentGenomes.map((genome) => {
					return (
						<div key={genome.id} className="mb-6">
							<GenomeCard genome={genome} />
						</div>
					);
				})}
			{genomeListMode === 'table' && <GenomeTable genomes={currentGenomes} />}
		</div>
	);
};

export default GenomeList;
