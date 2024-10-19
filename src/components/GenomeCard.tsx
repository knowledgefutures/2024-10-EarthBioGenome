import React from 'react';
import type { PopulatedGenome } from '~/types/pubs';

type Props = {
	genome: PopulatedGenome;
};

const GenomeCard: React.FC<Props> = ({ genome }) => {
	return (
		<div className="max-w-sm rounded overflow-hidden border p-2">
			<a href={`/genome/${genome.slug}`}>
				<div className="text-xl font-bold truncate capitalize">
					{genome.commonName} · <i>{genome.species}</i>
				</div>
				<div className="text-base text-neutral-500 -mt-1">
					<span className="italic">People's names here</span>
					{/* <span class="italic">by {getArticleAuthors(article.id)}</span> */}
				</div>
			</a>
		</div>
	);
};

export default GenomeCard;
