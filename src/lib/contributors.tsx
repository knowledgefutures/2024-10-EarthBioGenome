import type { ReactNode } from 'react';
import contributors from '~/data/contributors.json';
import type { Author, Contributor } from '~/types/pubs';
import { getAuthor } from './populateData';

type PopulatedContributor = Contributor & { author: Author };

export const getContributors = (genomeNoteId: string): PopulatedContributor[] => {
	return contributors
		.filter((contributor) => {
			return contributor.genomeNoteId === genomeNoteId;
		})
		.map((contributor) => {
			const author = getAuthor(contributor.authorId);
			return { ...contributor, author };
		});
};
