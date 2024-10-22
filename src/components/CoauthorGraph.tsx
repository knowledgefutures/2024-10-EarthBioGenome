import { useEffect, useState } from 'react';
import type { Genome, CoauthorContributor } from '~/types/pubs';

type Props = {
	coauthorContributors: CoauthorContributor[];
};

type Path = {
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
					const controlPointX1 =
						sourceBounding.right +
						(targetBounding.left - sourceBounding.right) / 3 -
						containerBounding.left;
					const controlPointX2 =
						sourceBounding.right +
						(2 * (targetBounding.left - sourceBounding.right)) / 3 -
						containerBounding.left;
					const controlPointY1 =
						sourceBounding.top + sourceBounding.height / 2 - containerBounding.top;
					const controlPointY2 =
						targetBounding.top + targetBounding.height / 2 - containerBounding.top;

					return {
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
	return (
		<div id="coauthor-container" className="flex justify-between relative">
			<div id="left" className="space-y-6">
				{authors.map((author) => {
					return (
						<div
							key={author.id}
							id={author.id}
							className="p-2 whitespace-nowrap border border-neutral-300 bg-neutral-100 rounded truncate text-center"
						>
							<a href={`/author/${author.slug}`}>{author.name}</a>
						</div>
					);
				})}
			</div>
			<div id="right" className="space-y-6">
				{genomes.map((genome) => {
					return (
						<div
							key={genome.id}
							id={genome.id}
							className="p-2 whitespace-nowrap border border-neutral-300 bg-neutral-100 rounded truncate text-center"
						>
							<a href={`/genome/${genome.slug}`}>{genome.commonName}</a>
						</div>
					);
				})}
			</div>
			<svg className="absolute w-full h-full top-0 left-0 pointer-events-none">
				{paths.map((path, index) => (
					<path
						key={index}
						d={`M${path.x1},${path.y1} C${path.cx1},${path.cy1} ${path.cx2},${path.cy2} ${path.x2},${path.cy2}`}
						stroke="#777"
						fill="transparent"
					/>
				))}
			</svg>
		</div>
	);
};
export default CoauthorGraph;
