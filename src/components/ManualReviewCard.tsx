import React, { useState } from 'react';
import type { ManualReview } from '~/types/pubs';
import { Button } from '~/components/ui/button';
import { BadgeCheck, ChevronDown, ChevronUp, CircleSlash } from 'lucide-react';

type Props = {
	manualReview: ManualReview;
};

const ManualReviewCard: React.FC<Props> = ({ manualReview }) => {
	const [isOpen, setIsOpen] = useState(false);
	const overallPass = false;
	return (
		<div className="border border-neutral-200 py-1 px-2 mb-2 rounded">
			<div className="flex justify-between items-center">
				<div>Manual Review</div>
				<div className="flex items-center space-x-2">
					{overallPass ? <BadgeCheck color="green" /> : <CircleSlash color="red" />}

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
		</div>
	);
};

export default ManualReviewCard;
