import type { GenomeNote, TechnicalReview } from '~/types/pubs';

export const getTechReviewRows = (genomeNote: GenomeNote, technicalReview: TechnicalReview) => {
	return [
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
			metric: 'Consensus quality (QV)',
			value: genomeNote.QV,
			benchmark: '≥50',
			passed: technicalReview.qvPass,
		},
		{
			metric: 'Percentage of assembly mapped to chromosomes',
			value: `${genomeNote.assemblyPercent}%`,
			benchmark: '≥95%',
			passed: technicalReview.percentAssemblyPass,
		},
		{
			metric: 'Number of Gaps',
			value: `${genomeNote.gapCount} Total`,
			benchmark: '<200 per Gb',
			passed: technicalReview.gapsPass,
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
};

export const getOverallPass = (genomeNote: GenomeNote, technicalReview: TechnicalReview) => {
	// const rows = getTechReviewRows(genomeNote, technicalReview);
	// return rows.reduce((prev, curr) => {
	// 	return prev && curr.passed;
	// }, true);
	return (
		technicalReview.contigN50Pass &&
		technicalReview.scaffoldN50Pass &&
		technicalReview.qvPass &&
		technicalReview.percentAssemblyPass
	);
};
