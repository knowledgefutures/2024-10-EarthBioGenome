import React, { useState } from 'react';
import { getAuthor } from '~/lib/populateData';
import type { NestedComment as NestedCommentType } from '~/types/pubs';
import { Button } from '~/components/ui/button';
type Props = {
	nestedComment: NestedCommentType;
};

const NestedComment: React.FC<Props> = ({ nestedComment }) => {
	const [isOpen, setIsOpen] = useState(true);
	const author = getAuthor(nestedComment.authorId);

	return (
		<div>
			<div className="flex items-center opacity-50 text-sm">
				<span>
					<a href={`/author/${author.slug}`}>{author.name}</a>
					{' · '}6 hours ago{' · '}
				</span>
				<Button
					variant="ghost"
					size="sm"
					className="p-1 h-auto"
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					[{isOpen ? '-' : '+'}]
				</Button>
			</div>
			{isOpen && (
				<>
					<div>{nestedComment.content}</div>
					<div>
						<Button variant="ghost" size="sm" className="p-1 h-auto opacity-50">
							reply
						</Button>
					</div>
					{nestedComment.replies.map((reply) => {
						return (
							<div className="ml-8">
								<NestedComment key={reply.id} nestedComment={reply} />
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};

export default NestedComment;
