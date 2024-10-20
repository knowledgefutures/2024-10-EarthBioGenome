import React, { useState } from 'react';
import type { ManualReview } from '~/types/pubs';
import { Button } from '~/components/ui/button';
import { BadgeCheck, ChevronDown, ChevronUp, CircleSlash } from 'lucide-react';
import { getAuthor } from '~/lib/populateData';

type Props = {
	manualReview: ManualReview;
};

const ManualReviewCard: React.FC<Props> = ({ manualReview }) => {
	const [isOpen, setIsOpen] = useState(false);
	const author = getAuthor(manualReview.authorId);
	const rows = [
		{
			metric: author.name,
			value: `${manualReview.content}`,
		},
		{
			metric: 'Sufficient methods for replication',
			value: manualReview.sufficientMethodsForReplication ? 'True' : 'False',
		},
		{
			metric: 'Appropriate protocols used',
			value: manualReview.protocolsAppropriate ? 'True' : 'False',
		},
		{
			metric: 'Work is technically sound',
			value: manualReview.technicallySound ? 'True' : 'False',
		},
		{
			metric: 'Competing inerests',
			value: manualReview.competingInterests,
		},
	];
	const overallPass =
		manualReview.protocolsAppropriate &&
		manualReview.technicallySound &&
		manualReview.sufficientMethodsForReplication;
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
			{isOpen && (
				<>
					<hr className="my-2" />
					{rows.map((row, index) => {
						return (
							<div
								key={row.metric}
								className={`pt-4 mb-4 ${index === 0 ? '' : 'border-t'} border-neutral-300 text-sm flex justify-between items-start space-x-8`}
							>
								<div className="">
									<div className="font-bold">{row.metric}</div>
									<div className="">{row.value}</div>
								</div>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};

export default ManualReviewCard;
