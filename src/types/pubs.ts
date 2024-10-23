export interface Genome {
	id: string;
	slug: string;
	commonName: string;
	species: string;
	genus: string;
	phylum: string;
	class: string;
	order: string;
	family: string;
	taxonomyAuthor: string;
	ncbiTaxId: string;
	pressFeed?: boolean;
}

export interface GenomeNote {
	id: string;
	genomeId: string;
	content: string;
	DOI: string;

	bioproject: string;
	biosample: string;
	tolid: string;
	pacbioSampleAccession: string;
	pacbioOrganismPart: string;
	hicTolid: string;
	hicSampleAccession: string;
	hicOrganismPart: string;
	rnaTolid: string;
	rnaSampleAccession: string;
	rnaOrganismPart: string;

	assemblyName: string;
	assemblyAccession: string;
	alternateAccession: string;
	lengthTotalMb: number;
	contigCount: number;
	contigN50: number;
	scaffoldCount: number;
	scaffoldN50: number;
	longestScaffold: number;

	QV: number;
	k_mer: number;
	buscoString: string;
	assemblyPercent: number;
	sexChromosomes: string;
	lengthMitoKb: number;
	lengthPlastidKb: number;

	chromosomeCount: number;
	proteinGeneCount: number;
	nonCodingCount: number;
	transcriptCount: number;

	observedSex: string;
	pacbioCollectionLocation: string;
	pacbioBasesGb: number;
	pacbioReadsMillions: number;
	lrCov: number;
	hicBaseCountGb: number;
	hicReadsMillions: number;
	manualBreaksAndJoins: number;
	manualHaplotigRemovals: number;
	scaffoldLengthChange: number;
	scaffoldCountChange: number;
	scaffoldN50Change: number;
	gapCount: number;
	autosomesCount: number;
	manualNote: string;

	buscoLineage: string;
	buscoN: number;
	buscoCompleteness: number;
	buscoSingle: number;
	buscoDuplicated: number;
}

export interface Protocol {
	id: string;
	name: string;
	slug: string;
	protocolUrl: string; // link to protocols.io
	content: string; // freeform markdown
	doi: string;
}

export interface ProtocolUse {
	id: string;
	protocolId: string;
	genomeNoteId: string;
}

export interface TechnicalReview {
	id: string;
	genomeNoteId: string;

	contigN50Pass: boolean;
	scaffoldN50Pass: boolean;
	gapsPass: boolean;
	qvPass: boolean;
	kmerPass: boolean;
	buscoPass: boolean;
	percentAssemblyPass: boolean;
	sexChromosomePass: boolean;
	organellePass: boolean;
}

export interface ManualReview {
	id: string;
	authorId: string;
	genomeNoteId: string;
	content: string;
	sufficientMethodsForReplication: boolean;
	protocolsAppropriate: boolean;
	technicallySound: boolean;
	competingInterests: string;
}

export interface Comment {
	id: string;
	authorId: string;
	genomeId: string;
	postId: string;
	parentCommentId: string;
	content: string;
}

export interface Post {
	id: string;
	authorId: string;
	slug: string;
	title: string;
	content: string;
}

export interface Author {
	id: string;
	name: string;
	slug: string;
	orcid: string;
	affiliation: string;
}

export const roles = [
	'Conceptualization',
	'Data curation',
	'Formal analysis',
	'Funding acquisition',
	'Investigation',
	'Methodology',
	'Project administration',
	'Software',
	'Resources',
	'Supervision',
	'Validation',
	'Visualization',
	'Writing – original draft',
	'Writing – review & editing',
];
export interface Contributor {
	id: string;
	authorId: string;
	genomeNoteId: string;
	roles: typeof roles;
	pacbioCollector: boolean;
	rnaCollector: boolean;
	hicCollector: boolean;
}

export interface Project {
	id: string;
	name: string;
	slug: string;
	website: string;
}

export interface ProjectMember {
	id: string;
	authorId: string;
	projectId: string;
}

export interface ProjectGenomeNote {
	id: string;
	genomeNoteId: string;
	projectId: string;
}

export type PopulatedGenome = Genome & { genomeNote: GenomeNote; project: Project };

export type NestedComment = Comment & { replies: NestedComment[] };

export type PubType = {
	name: string;
	fields: { key: string; value: string }[];
};

export type CoauthorContributor = Contributor & { genomes: Genome[]; author: Author };
