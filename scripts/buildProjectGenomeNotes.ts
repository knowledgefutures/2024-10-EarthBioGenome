import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import projects from '~/data/projects.json';
import genomeNotes from '~/data/genomeNotes.json';
import { type GenomeNote, type ProjectGenomeNote } from '~/types/pubs';

const projectIds = projects.map((project) => {
	return project.id;
});

const generateProjectGenomeNote = (genomeNote: GenomeNote): ProjectGenomeNote => {
	const randomIndex = Math.floor(Math.pow(Math.random(), 2) * projectIds.length);
	return {
		id: uuidv4(),
		genomeNoteId: genomeNote.id,
		projectId: projectIds[randomIndex],
	};
};

if (Array.isArray(genomeNotes)) {
	const projectNotes = genomeNotes.map((genomeNote) => {
		return generateProjectGenomeNote(genomeNote);
	});

	const outputFilePath = path.join(__dirname, '../src/data/projectGenomeNotes.json');

	fs.writeFile(outputFilePath, JSON.stringify(projectNotes, null, '\t'), (writeErr) => {
		if (writeErr) {
			console.error('Error writing the JSON file:', writeErr);
		} else {
			console.log('Technical reviews have been successfully written to the JSON file.');
		}
	});
} else {
	console.error('The JSON file does not contain an array of objects.');
}
