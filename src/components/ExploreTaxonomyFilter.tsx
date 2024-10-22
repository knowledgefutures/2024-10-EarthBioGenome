import type { Genome, Project } from '~/types/pubs';
import { Label } from '~/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';
import { Button } from './ui/button';
import type { Dispatch, SetStateAction } from 'react';

type Props = {
	allGenomes: Genome[] | Project[];
	label?: string;
	filterKey: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
};

const ExploreTaxonomyFilter = ({ allGenomes, label, filterKey, value, setValue }: Props) => {
	const items = Array.from(
		new Set(allGenomes.map((genome) => genome[filterKey as keyof (Genome | Project)]))
	);

	return (
		<div>
			<Label className="flex justify-between items-center h-6">
				<span className="capitalize">{label || filterKey}</span>{' '}
				{value && (
					<Button
						variant="ghost"
						size="sm"
						className="opacity-70 h-4 p-2 bg-transparent hover:bg-neutral-200"
						onClick={() => {
							setValue('');
						}}
					>
						clear
					</Button>
				)}
			</Label>
			<Select
				value={value}
				onValueChange={(newVal) => {
					setValue(newVal);
				}}
			>
				<SelectTrigger className="bg-white text-black">
					<SelectValue placeholder={`Select ${filterKey}`} />
				</SelectTrigger>
				<SelectContent>
					{items
						.sort((foo, bar) => {
							if (foo < bar) {
								return -1;
							}
							if (foo > bar) {
								return 1;
							}
							return 0;
						})
						.map((item) => {
							return (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							);
						})}
				</SelectContent>
			</Select>
		</div>
	);
};

export default ExploreTaxonomyFilter;
