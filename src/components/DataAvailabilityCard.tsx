import React, { useState } from 'react';
import type { Genome, GenomeNote } from '~/types/pubs';
import { Button } from '~/components/ui/button';
import { ChevronDown, ChevronUp, CircleSlash, BadgeCheck, CircleCheck } from 'lucide-react';

type Props = { genome: Genome; genomeNote: GenomeNote };

const DataAvailabilityCard: React.FC<Props> = ({ genome, genomeNote }) => {
	const [isOpen, setIsOpen] = useState(false);

	const overallPass = true;
	return (
		<div className="border border-neutral-200 py-1 px-2 mb-2 rounded">
			<div className="flex justify-between items-center">
				<div>Data Availability</div>
				<div className="flex items-center space-x-2">
					{overallPass ? <CircleCheck color="green" /> : <CircleSlash color="red" />}

					<Button
						variant="ghost"
						size="sm"
						onClick={() => {
							setIsOpen(!isOpen);
						}}
					>
						{isOpen ? <ChevronUp /> : <ChevronDown />}
					</Button>
				</div>
			</div>
			{isOpen && (
				<>
					<hr className="my-2" />
					<div className="prose text-sm text-black">
						<p>
							Accession number {genomeNote.bioproject};
							https://identifiers.org/ena.embl/{genomeNote.bioproject}. The genome
							sequence is released openly for reuse. The {genome.species} genome
							sequencing initiative is part of the Darwin Tree of Life (DToL) project.
							All raw sequence data and the assembly have been deposited in INSDC
							databases. The genome will be annotated using available RNA-Seq data and
							presented through the Ensembl pipeline at the European Bioinformatics
							Institute. Raw data and assembly accession identifiers are reported in
							Tables 1 and 2.
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default DataAvailabilityCard;
