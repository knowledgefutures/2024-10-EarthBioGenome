import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import genomeNotes from '~/data/genomeNotes.json';
import authors from '~/data/authors.json';
import { roles, type Contributor, type GenomeNote } from '~/types/pubs';

const generateContributorsForNote = (genomeNote: GenomeNote): Contributor[] => {
	const authorIds = authors.map((author) => {
		return author.id;
	});
	return Array.from({ length: Math.floor(Math.random() * 7) + 1 }).map(() => {
		/* Randomly choose an author, lightly biased towards lower numbers to
		match connection preference dynamics */
		const randomIndex = Math.floor(Math.pow(Math.random(), 2) * authorIds.length);
		const authorId = authorIds.splice(randomIndex, 1)[0];
		return {
			id: uuidv4(),
			authorId: authorId,
			genomeNoteId: genomeNote.id,
			roles: roles
				.sort(() => 0.5 - Math.random())
				.slice(0, Math.floor(Math.random() * 3) + 1),
			pacbioCollector: Math.random() < 0.3,
			rnaCollector: Math.random() < 0.3,
			hicCollector: Math.random() < 0.3,
		};
	});
};

if (Array.isArray(genomeNotes)) {
	const contributors = genomeNotes
		.map((note) => {
			return generateContributorsForNote(note);
		})
		.flat();

	const outputFilePath = path.join(__dirname, '../src/data/contributors.json');

	fs.writeFile(outputFilePath, JSON.stringify(contributors, null, '\t'), (writeErr) => {
		if (writeErr) {
			console.error('Error writing the JSON file:', writeErr);
		} else {
			console.log('Technical reviews have been successfully written to the JSON file.');
		}
	});
} else {
	console.error('The JSON file does not contain an array of objects.');
}
