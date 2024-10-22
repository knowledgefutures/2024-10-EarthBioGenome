import projectGenomeNotes from '~/data/projectGenomeNotes.json';
import genomeNotes from '~/data/genomeNotes.json';
import { getProject, getTechnicalReviews } from './populateData';
import { getOverallPass } from './technicalReviews';
import type { GenomeNote, Project } from '~/types/pubs';

export const getGenomeNoteFromGenome = (genomeId: string): GenomeNote => {
	const genomeNote = genomeNotes.find((genomeNote) => {
		return genomeNote.genomeId === genomeId;
	});
	if (!genomeNote) {
		throw new Error(`Incorrect genomeId! ${genomeId}`);
	}
	return genomeNote;
};

export const getTechReviewPassFromGenome = (genomeId: string): boolean => {
	const genomeNote = getGenomeNoteFromGenome(genomeId);
	const technicalReviews = getTechnicalReviews(genomeNote.id);
	return getOverallPass(genomeNote, technicalReviews[0]);
};

export const getProjectFromGenome = (genomeId: string): Project => {
	const genomeNote = getGenomeNoteFromGenome(genomeId);
	const projectGenomeNote = projectGenomeNotes.find((projectGenomeNote) => {
		return projectGenomeNote.genomeNoteId === genomeNote.id;
	});
	if (!projectGenomeNote) {
		throw new Error(`Incorrect genomeNoteId! ${genomeNote.id}`);
	}
	const project = getProject(projectGenomeNote.projectId);
	return project;
};
