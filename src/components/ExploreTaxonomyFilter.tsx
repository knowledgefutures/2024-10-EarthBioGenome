import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '~/lib/utils';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '~/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';

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
import { useState, type Dispatch, type SetStateAction } from 'react';
import type { FilterState, FilterKeys } from '~/components/GenomeExplore';

type Props = {
	allGenomes: Genome[] | Project[];
	label?: 'project';
	filterKey: FilterKeys;
	valueObject: FilterState;
	setValue: Dispatch<SetStateAction<FilterState>>;
};

const ExploreTaxonomyFilter = ({ allGenomes, label, filterKey, valueObject, setValue }: Props) => {
	const value = valueObject[label || filterKey];
	const [open, setOpen] = useState(false);
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
							setValue({ ...valueObject, [label || filterKey]: '' });
						}}
					>
						clear
					</Button>
				)}
			</Label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-full justify-between hover:bg-white hover:border-neutral-400"
					>
						<span className="truncate">
							{value && items.find((item) => item === value)}
							{!value && (
								<span className="opacity-60">
									Filter by {label || filterKey}...
								</span>
							)}
						</span>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[224px] p-0">
					<Command>
						<CommandInput placeholder={`Search ${label || filterKey}...`} />
						<CommandList>
							<CommandEmpty>No {label || filterKey} found.</CommandEmpty>
							<CommandGroup>
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
									.map((item) => (
										<CommandItem
											key={item}
											value={item}
											onSelect={(currentValue) => {
												setValue({
													...valueObject,
													[label || filterKey]:
														currentValue === value ? '' : currentValue,
												});
												setOpen(false);
											}}
										>
											<Check
												className={cn(
													'mr-2 h-4 w-4',
													value === item ? 'opacity-100' : 'opacity-0'
												)}
											/>
											{item}
										</CommandItem>
									))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{/* <Select
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
			</Select> */}
		</div>
	);
};

export default ExploreTaxonomyFilter;
