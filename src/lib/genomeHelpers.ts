import projectGenomeNotes from '~/data/projectGenomeNotes.json';
import genomeNotes from '~/data/genomeNotes.json';
import protocols from '~/data/protocols.json';
import protocolUses from '~/data/protocolUses.json';
import { getProject, getTechnicalReviews } from './populateData';
import { getOverallPass } from './technicalReviews';
import type { GenomeNote, Project, Protocol } from '~/types/pubs';

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

export const getProtocolsFromGenome = (genomeId: string): Protocol[] => {
	const genomeNote = getGenomeNoteFromGenome(genomeId);
	const activeProtocolUses = protocolUses.filter((protocolUse) => {
		return genomeNote.id === protocolUse.genomeNoteId;
	});
	const activeProtocols = activeProtocolUses.map((protocolUse) => {
		const protocol = protocols.find((protocol) => {
			return protocol.id === protocolUse.protocolId;
		});
		if (!protocol) {
			throw new Error(`Incorrect protocolId! ${protocolUse.protocolId}`);
		}
		return protocol;
	});
	return activeProtocols;
};
