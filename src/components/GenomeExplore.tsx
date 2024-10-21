import type { PopulatedGenome } from '~/types/pubs';
import GenomeList from './GenomeList';
import { useEffect, useRef, useState } from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';

type Props = {
	allGenomes: PopulatedGenome[];
};

const GenomeExplore = ({ allGenomes }: Props) => {
	const timeout = useRef<number | undefined>(undefined);
	const [activeGenomes, setActiveGenomes] = useState(allGenomes);
	const [query, setQuery] = useState('');
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const query = params.get('q') || '';
		setQuery(query.toLowerCase());
	}, []);
	useEffect(() => {
		const activeGenomes = allGenomes.filter((genome) => {
			if (genome.commonName.toLowerCase().includes(query)) {
				return true;
			}
			if (genome.species.toLowerCase().includes(query)) {
				return true;
			}
			if (genome.taxonomyAuthor.toLowerCase().includes(query)) {
				return true;
			}
			return false;
		});
		setActiveGenomes(activeGenomes);
	}, [query]);
	const updateSearchParams = (key: string, value: string) => {
		clearTimeout(timeout.current);
		timeout.current = window.setTimeout(() => {
			const params = new URLSearchParams(window.location.search);
			params.set(key, value);
			params.forEach((value, key) => {
				if (value === '') {
					params.delete(key);
				}
			});
			const paramsString = params.toString();
			window.history.replaceState(
				{},
				'',
				`${window.location.pathname}${paramsString.length ? '?' : ''}${paramsString}`
			);
		}, 250);
	};

	return (
		<>
			<div className="bg-neutral-200 border border-neutral-300 rounded mb-6 p-2 space-y-8">
				<div className="">
					<Label>Text Search</Label>
					<Input
						className="bg-white"
						placeholder="Search..."
						value={query}
						onChange={(evt) => {
							setQuery(evt.target.value);
							updateSearchParams('q', evt.target.value);
						}}
					/>
				</div>
				<div className="">
					<Label>Family</Label>
					<Select>
						<SelectTrigger className="bg-white">
							<SelectValue placeholder="Select Family" />
						</SelectTrigger>
						<SelectContent>
							{allGenomes.sort((foo, bar)=>{
								if (foo.family < bar.family) {
									return -1;
								}
								if (foo.family > bar.family)  {
									return 1;
								}
								return 0;
							}).map((genome)=>{
								return <SelectItem value={genome.family}>{genome.family}</SelectItem>
							})}
						</SelectContent>
					</Select>
				</div>
			</div>
			<GenomeList genomes={activeGenomes} />
		</>
	);
};

export default GenomeExplore;
