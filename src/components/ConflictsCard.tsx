import React, { useState } from 'react';
import type { ManualReview } from '~/types/pubs';
import { Button } from '~/components/ui/button';
import { ChevronDown, ChevronUp, CircleSlash, CircleCheck } from 'lucide-react';

type Props = {};

const ConflictsCard: React.FC<Props> = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const overallPass = true;
	return (
		<div className="border border-neutral-200 py-1 px-2 mb-2 rounded">
			<div className="flex justify-between items-center">
				<div>Conflicts of Interest</div>
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
							The authors declare that there are no conflicts of interest regarding
							the publication of this paper. No financial support or grants were
							received from any organizations that could potentially benefit from the
							results of this study. The research was conducted independently, and the
							authors have no affiliations with any entities that could be perceived
							as having a stake in the outcomes of this work.
						</p>

						<p>
							However, it should be noted that one of the authors has previously
							served as a reviewer for grant applications submitted to the funding
							agency that supports similar research. This role was performed in a
							professional capacity and did not influence the design, execution, or
							reporting of the current study. The authors affirm that this prior
							involvement does not constitute a conflict of interest and that the
							integrity of the research remains uncompromised.
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default ConflictsCard;
