import React from 'react';
import type { PopulatedGenome } from '~/types/pubs';

type Props = {
	genome: PopulatedGenome;
};

const GenomeCard: React.FC<Props> = ({ genome }) => {
	return (
		<div className="max-w-sm rounded overflow-hidden border p-2">
			<a href={`/genome/${genome.slug}`}>
				{genome.species} · {genome.commonName}
			</a>
		</div>
	);
};

export default GenomeCard;
