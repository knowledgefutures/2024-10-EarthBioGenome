import React, { useState } from 'react';
import type { ManualReview } from '~/types/pubs';
import { Button } from '~/components/ui/button';
import { ShieldCheck, ChevronDown, ChevronUp, CircleSlash } from 'lucide-react';

type Props = {};

const PermissionToSequenceCard: React.FC<Props> = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const overallPass = true;
	return (
		<div className="border border-neutral-200 py-1 px-2 mb-2 rounded">
			<div className="flex justify-between items-center">
				<div>Permission To Sequence</div>
				<div className="flex items-center space-x-2">
					{overallPass ? <ShieldCheck color="green" /> : <CircleSlash color="red" />}

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
							The Wellcome Sanger Institute employs a process whereby due diligence is
							carried out proportionate to the nature of the materials themselves, and
							the circumstances under which they have been/are to be collected and
							provided for use. The purpose of this is to address and mitigate any
							potential legal and/or ethical implications of receipt and use of the
							materials as part of the research project, and to ensure that in doing
							so we align with best practice wherever possible.
						</p>
						<p>The overarching areas of consideration are:</p>
						<ul>
							<li>Ethical review of provenance and sourcing of the material.</li>
							<li>
								Legality of collection, transfer and use (national and
								international).
							</li>
						</ul>
						<p>
							Each transfer of samples is undertaken according to a Research
							Collaboration Agreement or Material Transfer Agreement entered into by
							the Tree of Life collaborator, Genome Research Limited (operating as the
							Wellcome Sanger Institute) and in some circumstances other Tree of Life
							collaborators.
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default PermissionToSequenceCard;
