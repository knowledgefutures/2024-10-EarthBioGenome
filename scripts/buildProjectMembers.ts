import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import projects from '~/data/projects.json';
import authors from '~/data/authors.json';
import { type ProjectMember, type Author } from '~/types/pubs';

const projectIds = projects.map((project) => {
	return project.id;
});

const generateProjectMember = (author: Author): ProjectMember => {
	const randomIndex = Math.floor(Math.pow(Math.random(), 2) * projectIds.length);
	return {
		id: uuidv4(),
		authorId: author.id,
		projectId: projectIds[randomIndex],
	};
};

if (Array.isArray(authors)) {
	const members = authors.map((author) => {
		return generateProjectMember(author);
	});

	const outputFilePath = path.join(__dirname, '../src/data/projectMembers.json');

	fs.writeFile(outputFilePath, JSON.stringify(members, null, '\t'), (writeErr) => {
		if (writeErr) {
			console.error('Error writing the JSON file:', writeErr);
		} else {
			console.log('Technical reviews have been successfully written to the JSON file.');
		}
	});
} else {
	console.error('The JSON file does not contain an array of objects.');
}
