import { useEffect, useState } from 'react';
import type { Genome, CoauthorContributor } from '~/types/pubs';
import { Badge } from './ui/badge';

type Props = {
	coauthorContributors: CoauthorContributor[];
};

type Path = {
	source: string;
	target: string;
	x1: number;
	y1: number;
	x2: number;
	cx1: number;
	cx2: number;
	cy1: number;
	cy2: number;
};
const CoauthorGraph: React.FC<Props> = ({ coauthorContributors }) => {
	const [paths, setPaths] = useState<Path[]>([]);
	const [authorHover, setAuthorHover] = useState('');
	const [genomeHover, setGenomeHover] = useState('');
	const authors = coauthorContributors.map((coauthorContributor) => {
		return coauthorContributor.author;
	});
	const genomes = coauthorContributors
		.flatMap((coauthorContributor) => coauthorContributor.genomes)
		.reduce((acc: Genome[], genome) => {
			if (!acc.some((g) => g.id === genome.id)) {
				acc.push(genome);
			}
			return acc;
		}, []);
	useEffect(() => {
		const calculatePaths = () => {
			const pathsToDraw = coauthorContributors.flatMap((coauthorContributor) => {
				const authorId = coauthorContributor.authorId;
				const genomeIds = coauthorContributor.genomes.map((genome) => genome.id);
				const edgeArray = genomeIds.map((genomeId) => {
					return { source: authorId, target: genomeId };
				});
				return edgeArray;
			});

			// prettier-ignore
			const newPaths = pathsToDraw
				.map(({ source, target }) => {
					const sourceDiv = document.getElementById(source);
					const targetDiv = document.getElementById(target);
					if (!sourceDiv || !targetDiv) {
						return null;
					}
					const container = document.getElementById('coauthor-container');
					if (!container) {
						return null;
					}
					const containerBounding = container.getBoundingClientRect();
					const sourceBounding = sourceDiv.getBoundingClientRect();
					const targetBounding = targetDiv.getBoundingClientRect();
					const controlPointX1 = sourceBounding.right + (targetBounding.left - sourceBounding.right) / 3 - containerBounding.left;
					const controlPointX2 = sourceBounding.right + (2 * (targetBounding.left - sourceBounding.right)) / 3 - containerBounding.left;
					const controlPointY1 = sourceBounding.top + sourceBounding.height / 2 - containerBounding.top;
					const controlPointY2 = targetBounding.top + targetBounding.height / 2 - containerBounding.top;

					return {
						source,
						target,
						x1: sourceBounding.right - containerBounding.left,
						y1: controlPointY1,
						x2: targetBounding.left - containerBounding.left,
						cx1: controlPointX1,
						cx2: controlPointX2,
						cy1: controlPointY1,
						cy2: controlPointY2,
					};
				})
				.filter((path) => !!path);
			setPaths(newPaths);
		};

		calculatePaths();
		window.addEventListener('resize', calculatePaths);
		return () => window.removeEventListener('resize', calculatePaths);
	}, [coauthorContributors]);

	const inactiveAuthorIdsOnAuthor =
		authorHover &&
		authors
			.filter((author) => {
				return authorHover && authorHover !== author.id;
			})
			.map((author) => author.id);
	const inactiveAuthorIdsOnGenome =
		genomeHover &&
		coauthorContributors
			.filter((coauthorContributor) => {
				return !coauthorContributor.genomes.some((genome) => {
					return genome.id === genomeHover;
				});
			})
			.map((coauthorContributor) => coauthorContributor.author.id);
	const inactiveAuthorIds = inactiveAuthorIdsOnAuthor || inactiveAuthorIdsOnGenome;
	const activeGenomesOnGenome = genomeHover && [genomeHover];
	const activeGenomesOnAuthor =
		authorHover &&
		coauthorContributors
			.filter((coauthorContributor) => {
				return coauthorContributor.authorId === authorHover;
			})
			.flatMap((coauthorContributor) => {
				return coauthorContributor.genomes;
			})
			.map((genome) => {
				return genome.id;
			});
	const activeGenomes = activeGenomesOnGenome || activeGenomesOnAuthor;
	console.log(inactiveAuthorIds);
	return (
		<div id="coauthor-container" className="flex justify-between relative">
			<div id="left" className="space-y-6">
				{authors.map((author) => {
					const inactive = inactiveAuthorIds.includes(author.id);
					const count = paths.reduce((acc, path) => {
						if (path.source === author.id) {
							return acc + 1;
						}
						return acc;
					}, 0);
					return (
						<div
							key={author.id}
							id={author.id}
							className={` border border-neutral-300 bg-neutral-100 rounded truncate text-center ${inactive ? 'opacity-20' : ''}`}
							onMouseEnter={() => {
								setAuthorHover(author.id);
							}}
							onMouseLeave={() => {
								setAuthorHover('');
							}}
						>
							<a
								href={`/author/${author.slug}`}
								className="p-2 whitespace-nowrap hover:no-underline flex items-center justify-center"
							>
								<span className="pl-4">{author.name}</span>{' '}
								<span className="text-xs ml-3 px-1 inline-block rounded font-mono border border-neutral-300 bg-neutral-200">
									{count}
								</span>
							</a>
						</div>
					);
				})}
			</div>
			<div id="right" className="space-y-6">
				{genomes.map((genome) => {
					const inactive = activeGenomes && !activeGenomes.includes(genome.id);
					const count = paths.reduce((acc, path) => {
						if (path.target === genome.id) {
							return acc + 1;
						}
						return acc;
					}, 0);
					return (
						<div
							key={genome.id}
							id={genome.id}
							className={` border border-neutral-300 bg-neutral-100 rounded truncate text-center ${inactive ? 'opacity-20' : ''}`}
							onMouseEnter={() => {
								setGenomeHover(genome.id);
							}}
							onMouseLeave={() => {
								setGenomeHover('');
							}}
						>
							<a
								href={`/genome/${genome.slug}`}
								className="block p-2 whitespace-nowrap hover:no-underline"
							>
								<span className="text-xs mr-3 px-1 inline-block rounded font-mono border border-neutral-300 bg-neutral-200">
									{count}
								</span>
								<span className="pr-4">{genome.commonName}</span>
							</a>
						</div>
					);
				})}
			</div>
			<svg className="absolute w-full h-full top-0 left-0 pointer-events-none">
				{paths.map((path, index) => {
					const inactive =
						(authorHover || genomeHover) &&
						(inactiveAuthorIds.includes(path.source) ||
							!activeGenomes.includes(path.target));
					return (
						<path
							key={index}
							d={`M${path.x1},${path.y1} C${path.cx1},${path.cy1} ${path.cx2},${path.cy2} ${path.x2},${path.cy2}`}
							stroke="#777"
							fill="transparent"
							opacity={inactive ? 0.2 : 1.0}
						/>
					);
				})}
			</svg>
		</div>
	);
};
export default CoauthorGraph;
