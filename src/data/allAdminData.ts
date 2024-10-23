import projects from '~/data/projects.json';
import genomes from '~/data/genomes.json';
import genomeNotes from '~/data/genomeNotes.json';
import authors from '~/data/authors.json';
import contributors from '~/data/contributors.json';
import technicalReviews from '~/data/technicalReviews.json';
import manualReviews from '~/data/manualReviews.json';
import comments from '~/data/comments';
import posts from '~/data/posts.json';
import protocols from '~/data/protocols.json';

export const allAdminData = {
	Project: projects,
	Species: genomes,
	'Genome Note': genomeNotes,
	Author: authors,
	Contributor: contributors,
	'Technical Review': technicalReviews,
	'Manual Review': manualReviews,
	Comment: comments,
	Post: posts,
	Protocol: protocols,
};
