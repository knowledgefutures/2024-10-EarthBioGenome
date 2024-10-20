import React, { useState } from 'react';
import type { ManualReview } from '~/types/pubs';
import { Button } from '~/components/ui/button';
import { ShieldCheck, ChevronDown, ChevronUp, CircleSlash } from 'lucide-react';
import { getAuthor } from '~/lib/populateData';

type Props = {
	manualReview: ManualReview;
};

const PermissionToSequenceCard: React.FC<Props> = ({ manualReview }) => {
	const [isOpen, setIsOpen] = useState(false);
	// const author = getAuthor(manualReview.authorId);
	
	const overallPass =true;
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
					<div>Hello</div>
				</>
			)}
		</div>
	);
};

export default PermissionToSequenceCard;
