interface Genome {
	id: string;
	slug: string;
	// Need all the specifics, like taxon etc.
	commonName: string;
	species: string;
	phylum: string;
	class: string;
	order: string;
	family: string;
	taxonomyAuthor: string;
	ncbiTaxId: string;
};

interface GenomeNote {
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
};

interface Protocol {
	id: string;
	protocolUrl: string; // link to protocols.io 
	content: string; // freeform markdown
};

interface ProtocolUse { 
	id: string;
	protocolId: string;
	genomeNoteId: string;
}

interface TechnicalReview {
	id: string;
	genomeNoteId: string;
	/* Need fields that will be completed here */
};

interface ManualReview {
	id: string;
	author: string;
	content: string;
	genomeNoteId: string;
};

interface Comment {
	id: string;
	author: string;
	genomeNoteId: string;
	postId: string;
	parentCommentId: string;
	content: string;
};

interface Post {
	id: string;
	authorId: string;
	content: string;
};

interface Author {
	id: string;
	name: string;
	slug: string;
	orcid: string;
	affiliation: string;
};

interface Contributor {
	id: string;
	authorId: string;
	genomeNoteId: string;
	roles: ("Conceptualization" | "Data curation" | "Formal analysis" | "Funding acquisition" | "Investigation" | "Methodology" | "Project administration" | "Software" | "Resources" | "Supervision" | "Validation" | "Visualization" | "Writing – original draft" | "Writing – review & editing")[]
	pacbioCollector: boolean;
	rnaCollector: boolean;
	hicCollector: boolean;
}

interface Project {
	id: string;
	name: string;
	website: string;
}

interface ProjectMember {
	id: string;
	authorId: string;
	projectId: string;
}

interface ProjectGenomeNotes {
	id: string;
	genomeNoteId: string;
	projectId: string;
}