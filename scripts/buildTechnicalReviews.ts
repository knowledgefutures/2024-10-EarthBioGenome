import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import genomeNotes from '~/data/genomeNotes.json';
import type { GenomeNote, TechnicalReview } from '~/types/pubs';

const generateTechnicalReview = (genomeNote: GenomeNote): TechnicalReview => {
	return {
		id: uuidv4(),
		genomeNoteId: genomeNote.id,
		contigN50Pass: genomeNote.contigN50 > 1,
		scaffoldN50Pass: genomeNote.scaffoldN50 > 10,
		gapsPass: genomeNote.gapCount < 200,
		qvPass: genomeNote.QV >= 50,
		kmerPass: genomeNote.k_mer > 95,
		buscoPass: genomeNote.buscoCompleteness > 95,
		percentAssemblyPass: genomeNote.assemblyPercent > 95,
		sexChromosomePass: genomeNote.sexChromosomes !== '',
		organellePass: true,
	};
};

if (Array.isArray(genomeNotes)) {
	const technicalReviews = genomeNotes.map((note) => {
		return generateTechnicalReview(note);
	});
	const outputFilePath = path.join(__dirname, '../src/data/technicalReviews.json');

	fs.writeFile(outputFilePath, JSON.stringify(technicalReviews, null, '\t'), (writeErr) => {
		if (writeErr) {
			console.error('Error writing the JSON file:', writeErr);
		} else {
			console.log('Technical reviews have been successfully written to the JSON file.');
		}
	});
} else {
	console.error('The JSON file does not contain an array of objects.');
}
