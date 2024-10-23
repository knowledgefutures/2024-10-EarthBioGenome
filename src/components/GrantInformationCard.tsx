import React, { useState } from 'react';
import { Button } from '~/components/ui/button';
import { ChevronDown, ChevronUp, CircleSlash, CircleCheck } from 'lucide-react';

type Props = {};

const GrantInformationCard: React.FC<Props> = ({}) => {
	const [isOpen, setIsOpen] = useState(false);

	const overallPass = true;
	return (
		<div className="border border-neutral-200 py-1 px-2 mb-2 rounded">
			<div className="flex justify-between items-center">
				<div>Grant Information</div>
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
							This work was supported by the National Institutes of Health through
							core funding to the Genome Research Institute (123456) and the
							Australian BioGenetics Project Discretionary Award (654321).
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default GrantInformationCard;
