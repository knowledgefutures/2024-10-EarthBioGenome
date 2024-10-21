import React from 'react';
import { getContributors } from '~/lib/contributors';
import type { PopulatedGenome } from '~/types/pubs';

type Props = {
	genome: PopulatedGenome;
};

const GenomeCard: React.FC<Props> = ({ genome }) => {
	const populatedContributors = getContributors(genome.genomeNote.id);
	return (
		<div className="rounded overflow-hidden border border-neutral-300 p-4">
			<div className="text-xl font-bold truncate">
				<a href={`/genome/${genome.slug}`}>
					{genome.commonName}
					<span className="italic opacity-70">
						{' '}
						· {genome.species} ({genome.taxonomyAuthor})
					</span>
				</a>
			</div>

			<div className="text-base text-neutral-500 my-1 italic truncate">
				{populatedContributors.map((populatedContributor, index) => {
					const { slug, name } = populatedContributor.author;
					return (
						<span key={slug} className="inline-block italic">
							{index > 0 && <span>, </span>}
							<a href={`/author/${slug}`}>{name}</a>
						</span>
					);
				})}
			</div>
			<div className="flex space-x-8">
				<div>
					<span className="opacity-50 text-sm pr-2">
						<span className="font-bold uppercase">DOI:</span>
					</span>
					<span className="">
						<a href={`https://dx.doi.org`}>{genome.genomeNote.DOI}</a>
					</span>
				</div>
				<div>
					<span className="opacity-50 text-sm pr-2">
						<span className="font-bold uppercase">NCBI:</span>
					</span>
					<span className="">
						<a
							href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${genome.ncbiTaxId}`}
						>
							{genome.ncbiTaxId}
						</a>
					</span>
				</div>
				<div>
					<span className="opacity-50 text-sm pr-2">
						<span className="font-bold uppercase">QV:</span>
					</span>
					<span className="">{genome.genomeNote.QV}</span>
				</div>
			</div>
		</div>
	);
};

export default GenomeCard;
