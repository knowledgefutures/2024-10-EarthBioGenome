import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import genomes from '~/data/genomes.json';
import { getGenomeNoteFromGenome } from '~/lib/genomeHelpers';

export function GET(context: APIContext) {
	return rss({
		title: 'Universal Genome Note Repository',
		description: 'A resource of the Earth BioGenome Project',
		site: context.site || 'https://ds006.knowledgefutures.org',
		items: genomes.map((genome) => {
			const genomeNote = getGenomeNoteFromGenome(genome.id);
			return {
				title: `${genome.commonName} · ${genome.species} (${genome.taxonomyAuthor})`,
				link: `/genome/${genome.slug}`,
				pubDate: new Date('2023-06-04'),
				description: `We present a genome assembly from an individual ${genomeNote.observedSex} ${genome.species} (${genome.commonName}; ${genome.phylum}; ${genome.class}; ${genome.order}; ${genome.family})`,
				categories: [genome.phylum, genome.class, genome.order, genome.family],
			};
		}),
	});
}
