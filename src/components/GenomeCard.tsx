import { Award, SquareSlash } from 'lucide-react';
import React from 'react';
import { getContributors } from '~/lib/contributors';
import { getProjectFromGenome, getTechReviewPassFromGenome } from '~/lib/genomeHelpers';
import type { PopulatedGenome } from '~/types/pubs';

type Props = {
	genome: PopulatedGenome;
};

const GenomeCard: React.FC<Props> = ({ genome }) => {
	const populatedContributors = getContributors(genome.genomeNote.id);
	const project = genome.project;
	const techReviewPass = getTechReviewPassFromGenome(genome.id);

	return (
		<div className="rounded overflow-hidden border border-neutral-300 p-4">
			<div className="text-xl font-bold truncate">
				<a href={`/genome/${genome.slug}`}>
					{genome.commonName}
					<span className="opacity-70">
						{' '}
						· <span className="italic">{genome.species}</span> ({genome.taxonomyAuthor})
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
				<div className="whitespace-nowrap">
					<span className="opacity-50 text-sm pr-2">
						<span className="font-bold uppercase">Project:</span>
					</span>
					<span className="">
						<a href={`/project/${project.slug}`}>{project.name}</a>
					</span>
				</div>
				<div className="whitespace-nowrap truncate">
					<span className="opacity-50 text-sm pr-2">
						<span className="font-bold uppercase">DOI:</span>
					</span>
					<span className="">
						<a href={`https://dx.doi.org`}>{genome.genomeNote.DOI}</a>
					</span>
				</div>
				<div className="whitespace-nowrap">
					<span className="opacity-50 text-sm pr-2">
						<span className="font-bold uppercase">NCBI TaxID:</span>
					</span>
					<span className="">
						<a
							href={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=${genome.ncbiTaxId}`}
						>
							{genome.ncbiTaxId}
						</a>
					</span>
				</div>

				<div className="whitespace-nowrap flex items-center">
					<span className="opacity-50 text-sm pr-2">
						<span className="font-bold uppercase">EBP Reference Genome:</span>
					</span>
					<span className="">
						{techReviewPass ? (
							<Award color="green" />
						) : (
							<SquareSlash color="red" />
						)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default GenomeCard;
