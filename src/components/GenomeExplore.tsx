import type { PopulatedGenome } from '~/types/pubs';
import GenomeList from './GenomeList';
import { useEffect, useRef, useState } from 'react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import projects from '~/data/projects.json';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select';
import { Button } from '~/components/ui/button';
import ExploreTaxonomyFilter from './ExploreTaxonomyFilter';
import { getTechReviewPassFromGenome } from '~/lib/genomeHelpers';
import { Award, SquareSlash } from 'lucide-react';

type Props = {
	allGenomes: PopulatedGenome[];
};

const defaultState = {
	query: '',
	family: '',
	order: '',
	genus: '',
	class: '',
	phylum: '',
	project: '',
	ebpRef: '',
};
export type FilterState = typeof defaultState;
export type FilterKeys = keyof typeof defaultState;

const GenomeExplore = ({ allGenomes }: Props) => {
	const timeout = useRef<number | undefined>(undefined);
	const [activeGenomes, setActiveGenomes] = useState(allGenomes);
	// const [query, setQuery] = useState('');
	// const [family, setFamily] = useState('');
	// const [order, setOrder] = useState('');
	// const [genus, setGenus] = useState('');
	// const [class, setclass] = useState('');
	// const [phylum, setPhylum] = useState('');
	// const [project, setProject] = useState('');
	// const [ebpRef, setEbpRef] = useState('');
	const [filterStates, setFilterStates] = useState({
		query: '',
		family: '',
		order: '',
		genus: '',
		class: '',
		phylum: '',
		project: '',
		ebpRef: '',
	});
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const queryVal = params.get('q') || '';
		const projectVal = params.get('project') || '';
		const familyVal = params.get('family') || '';
		const orderVal = params.get('order') || '';
		const genusVal = params.get('genus') || '';
		const classVal = params.get('class') || '';
		const phylumVal = params.get('phylum') || '';
		const ebpRefVal = params.get('ebpref') || '';
		const newFilterState = {
			query: queryVal,
			project: projectVal,
			family: familyVal,
			order: orderVal,
			genus: genusVal,
			class: classVal,
			phylum: phylumVal,
			ebpRef: ebpRefVal,
		};
		setFilterStates(newFilterState);
	}, []);
	useEffect(() => {
		const activeGenomes = allGenomes.filter((genome) => {
			const {
				query,
				family,
				order,
				genus,
				class: classT,
				phylum,
				project,
				ebpRef,
			} = filterStates;
			if (project && genome.project.name !== project) {
				return false;
			}
			if (family && genome.family !== family) {
				return false;
			}
			if (order && genome.order !== order) {
				return false;
			}
			if (classT && genome.class !== classT) {
				return false;
			}
			if (phylum && genome.phylum !== phylum) {
				return false;
			}
			if (genus && genome.genus !== genus) {
				return false;
			}

			const ebpRefPass = getTechReviewPassFromGenome(genome.id);
			if (ebpRef === 'passed' && !ebpRefPass) {
				return false;
			}
			if (ebpRef === 'failed' && ebpRefPass) {
				return false;
			}

			if (genome.commonName.toLowerCase().includes(query.toLowerCase())) {
				return true;
			}
			if (genome.species.toLowerCase().includes(query.toLowerCase())) {
				return true;
			}
			if (genome.taxonomyAuthor.toLowerCase().includes(query.toLowerCase())) {
				return true;
			}

			return false;
		});
		setActiveGenomes(activeGenomes);
		updateSearchParams();
	}, [filterStates]);
	const updateSearchParams = () => {
		const {
			query,
			family,
			order,
			genus,
			class: classT,
			phylum,
			project,
			ebpRef,
		} = filterStates;
		const searchParamFields = [
			{ key: 'q', value: query },
			{ key: 'project', value: project },
			{ key: 'genus', value: genus },
			{ key: 'family', value: family },
			{ key: 'order', value: order },
			{ key: 'class', value: classT },
			{ key: 'phylum', value: phylum },
			{ key: 'ebpref', value: ebpRef },
		];
		clearTimeout(timeout.current);
		timeout.current = window.setTimeout(() => {
			const params = new URLSearchParams(window.location.search);
			searchParamFields.forEach(({ key, value }) => {
				params.set(key, value);
			});
			searchParamFields.forEach(({ key }) => {
				const value = params.get(key);
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
			<div>
				<div className="bg-neutral-100 border border-neutral-300 rounded mb-6 p-3 space-y-8">
					<div className="">
						<Label>Text Search</Label>
						<Input
							className="bg-white"
							placeholder="Search..."
							value={filterStates.query}
							onChange={(evt) => {
								setFilterStates({ ...filterStates, query: evt.target.value });
								// updateSearchParams('q', evt.target.value);
							}}
						/>
					</div>
					<ExploreTaxonomyFilter
						allGenomes={projects}
						label="project"
						/* @ts-ignore */
						filterKey="name"
						valueObject={filterStates}
						setValue={setFilterStates}
					/>
					<ExploreTaxonomyFilter
						allGenomes={allGenomes}
						filterKey="genus"
						valueObject={filterStates}
						setValue={setFilterStates}
					/>
					<ExploreTaxonomyFilter
						allGenomes={allGenomes}
						filterKey="family"
						valueObject={filterStates}
						setValue={setFilterStates}
					/>
					<ExploreTaxonomyFilter
						allGenomes={allGenomes}
						filterKey="order"
						valueObject={filterStates}
						setValue={setFilterStates}
					/>
					<ExploreTaxonomyFilter
						allGenomes={allGenomes}
						filterKey="class"
						valueObject={filterStates}
						setValue={setFilterStates}
					/>
					<ExploreTaxonomyFilter
						allGenomes={allGenomes}
						filterKey="phylum"
						valueObject={filterStates}
						setValue={setFilterStates}
					/>
					<div className="">
						<Label className="flex justify-between items-center h-6">
							<span className="capitalize">EBP Reference Genome</span>{' '}
							{filterStates.ebpRef && (
								<Button
									variant="ghost"
									size="sm"
									className="opacity-70 h-4 p-2 bg-transparent hover:bg-neutral-200"
									onClick={() => {
										setFilterStates({ ...filterStates, ebpRef: '' });
									}}
								>
									clear
								</Button>
							)}
						</Label>
						<Select
							value={filterStates.ebpRef}
							onValueChange={(newVal) => {
								setFilterStates({ ...filterStates, ebpRef: newVal });
							}}
						>
							<SelectTrigger className="bg-white text-black hover:border-neutral-400">
								<SelectValue
									placeholder={
										<span className="opacity-60">Select Reference Status</span>
									}
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={'passed'}>
									<span className="flex items-center">
										<Award color="green" size={16} className="mr-1" /> Passed
									</span>
								</SelectItem>
								<SelectItem value={'failed'}>
									<span className="flex items-center">
										<SquareSlash color="red" size={16} className="mr-1" /> Not
										Passed
									</span>
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>
			<GenomeList genomes={activeGenomes} />
		</>
	);
};

export default GenomeExplore;
