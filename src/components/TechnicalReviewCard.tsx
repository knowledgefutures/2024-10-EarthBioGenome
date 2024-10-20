import React, { useState } from 'react';
import type { GenomeNote, TechnicalReview } from '~/types/pubs';
import { Button } from '~/components/ui/button';
import { Award, BadgeCheck, Check, ChevronDown, ChevronUp, CircleMinus, CircleSlash, SquareCheck, SquareSlash } from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '~/components/ui/table';

type Props = {
	genomeNote: GenomeNote;
	technicalReview: TechnicalReview;
};

const TechnicalReviewCard: React.FC<Props> = ({ genomeNote, technicalReview }) => {
	const [isOpen, setIsOpen] = useState(false);
	const rows = [
		{
			metric: 'Contig N50 length (Mb)',
			value: `${genomeNote.contigN50} Mb`,
			benchmark: '>1 Mb',
			passed: technicalReview.contigN50Pass,
		},
		{
			metric: 'Scaffold N50 length (Mb)',
			value: `${genomeNote.scaffoldN50} Mb`,
			benchmark: '>10 Mb',
			passed: technicalReview.scaffoldN50Pass,
		},
		{
			metric: 'Number of Gaps',
			value: `${genomeNote.gapCount} Total`,
			benchmark: '<200 per Gb',
			passed: technicalReview.gapsPass,
		},
		{
			metric: 'Consensus quality (QV)',
			value: genomeNote.QV,
			benchmark: '≥50',
			passed: technicalReview.qvPass,
		},
		{
			metric: 'k-mer completeness',
			value: `${genomeNote.k_mer}%`,
			benchmark: '≥95%',
			passed: technicalReview.kmerPass,
		},
		{
			metric: 'BUSCO',
			value: genomeNote.buscoString,
			benchmark: 'C ≥ 95%',
			passed: technicalReview.buscoPass,
		},
		{
			metric: 'Percentage of assembly mapped to chromosomes',
			value: `${genomeNote.assemblyPercent}%`,
			benchmark: '≥95%',
			passed: technicalReview.percentAssemblyPass,
		},
		{
			metric: 'Sex chromosomes',
			value: genomeNote.sexChromosomes,
			benchmark: 'Identified',
			passed: technicalReview.sexChromosomePass,
		},
		{
			metric: 'Organelles',
			value: `${genomeNote.lengthMitoKb} kb`,
			benchmark: 'One complete allele',
			passed: technicalReview.organellePass,
		},
	];
	const overallPass = rows.reduce((prev, curr) => {
		return prev && curr.passed;
	}, true);
	return (
		<div className="border border-neutral-200 py-1 px-2 mb-2 rounded">
			<div className="flex justify-between items-center">
				<div>Technical Review</div>
				<div className="flex items-center space-x-2">
					{overallPass ? <Award color="green" /> : <SquareSlash color="red" />}

					<Button
						variant="ghost"
						size="sm"
						onClick={() => {
							setIsOpen(!isOpen);
						}}
					>
						{isOpen ? <ChevronUp /> : <ChevronDown />}
					</Button>
				</div>
			</div>
			{isOpen && (
				<>
					<hr className="my-2" />
					{/* <div className="font-mono">
						<Table>
							<TableHeader>
								<TableRow className="hover:bg-white">
									<TableHead>Metric</TableHead>
									<TableHead className="">Value</TableHead>
									<TableHead className="text-right">Benchmark</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{rows.map((row, index) => {
									return (
										<TableRow
											key={row.metric}
											className={index % 2 === 0 ? 'bg-muted/40' : ''}
										>
											<TableCell>{row.metric}</TableCell>
											<TableCell>{row.value}</TableCell>
											<TableCell className="text-right">
												{row.benchmark}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</div> */}
					{rows.map((row, index) => {
						return (
							<div
								key={row.metric}
								className={`pt-4 mb-4 ${index === 0 ? '' : 'border-t'} border-neutral-300 text-sm flex justify-between items-start space-x-8`}
							>
								<div className="">
									<div className="font-bold">{row.metric}</div>
									<div className="font-mono grid grid-cols-[100px,1fr]">
										<div className="uppercase font-bold opacity-50">
											Benchmark:
										</div>
										<div>{row.benchmark}</div>
										<div className="uppercase font-bold opacity-50">Value:</div>
										<div className="break-all">{row.value}</div>
									</div>
								</div>
								<div>
									{row.passed ? (
										<SquareCheck color="green" />
									) : (
										<SquareSlash color="red" />
									)}
								</div>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};

export default TechnicalReviewCard;
