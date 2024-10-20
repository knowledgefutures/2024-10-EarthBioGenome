import genomes from '~/data/genomes.json';
import genomeNotes from '~/data/genomeNotes.json';
import posts from '~/data/posts.json';
import authors from '~/data/authors.json';
import projects from '~/data/projects.json';
import technicalReviews from '~/data/technicalReviews.json';
import manualReviews from '~/data/manualReviews.json';
import type {
	Genome,
	GenomeNote,
	Post,
	Author,
	Project,
	TechnicalReview,
	ManualReview,
} from '~/types/pubs';

export const getGenomeNote = (genomeNoteId: string): GenomeNote => {
	const genomeNote = genomeNotes.find((genomeNote) => {
		return genomeNote.id === genomeNoteId;
	});
	if (!genomeNote) {
		throw new Error(`Incorrect genomeNoteId somewhere! ${genomeNoteId}`);
	}
	return genomeNote;
};

export const getGenome = (genomeId: string): Genome => {
	const genome = genomes.find((genome) => {
		return genome.id === genomeId;
	});
	if (!genome) {
		throw new Error(`Incorrect genomeId somewhere! ${genomeId}`);
	}
	return genome;
};

export const getPost = (postId: string): Post => {
	const post = posts.find((post) => {
		return post.id === postId;
	});
	if (!post) {
		throw new Error(`Incorrect postId somewhere! ${postId}`);
	}
	return post;
};

export const getAuthor = (authorId: string): Author => {
	const author = authors.find((author) => {
		return author.id === authorId;
	});
	if (!author) {
		throw new Error(`Incorrect authorId somewhere! ${authorId}`);
	}
	return author;
};

export const getProject = (projectId: string): Project => {
	const project = projects.find((project) => {
		return project.id === projectId;
	});
	if (!project) {
		throw new Error(`Incorrect projectId somewhere! ${projectId}`);
	}
	return project;
};

export const getTechnicalReviews = (genomeNoteId: string): TechnicalReview[] => {
	return technicalReviews.filter((technicalReview) => {
		return technicalReview.genomeNoteId === genomeNoteId;
	});
};

export const getManualReviews = (genomeNoteId: string): ManualReview[] => {
	return manualReviews.filter((manualReview) => {
		return manualReview.genomeNoteId === genomeNoteId;
	});
};
