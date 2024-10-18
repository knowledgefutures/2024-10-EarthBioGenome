import genomes from '~/data/genomes.json';
import genomeNotes from '~/data/genomeNotes.json';
import posts from '~/data/posts.json';
import authors from '~/data/authors.json';
import type { Genome, GenomeNote, Post, Author } from '~/types/pubs';

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
