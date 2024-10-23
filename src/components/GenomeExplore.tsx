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

const GenomeExplore = ({ allGenomes }: Props) => {
	const timeout = useRef<number | undefined>(undefined);
	const [activeGenomes, setActiveGenomes] = useState(allGenomes);
	const [query, setQuery] = useState('');
	const [family, setFamily] = useState('');
	const [order, setOrder] = useState('');
	const [genus, setGenus] = useState('');
	const [classT, setClassT] = useState('');
	const [phylum, setPhylum] = useState('');
	const [project, setProject] = useState('');
	const [ebpRef, setEbpRef] = useState('');
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const query = params.get('q') || '';
		setQuery(query.toLowerCase());
	}, []);
	useEffect(() => {
		const activeGenomes = allGenomes.filter((genome) => {
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
	}, [query, project, family, order, genus, classT, phylum, ebpRef]);
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
			<div className="bg-neutral-100 border border-neutral-300 rounded mb-6 p-3 space-y-8">
				<div className="">
					<Label>Text Search</Label>
					<Input
						className="bg-white"
						placeholder="Search..."
						value={query}
						onChange={(evt) => {
							setQuery(evt.target.value);
							// updateSearchParams('q', evt.target.value);
						}}
					/>
				</div>
				<ExploreTaxonomyFilter
					allGenomes={projects}
					label="project"
					filterKey="name"
					value={project}
					setValue={setProject}
				/>
				<ExploreTaxonomyFilter
					allGenomes={allGenomes}
					filterKey="genus"
					value={genus}
					setValue={setGenus}
				/>
				<ExploreTaxonomyFilter
					allGenomes={allGenomes}
					filterKey="family"
					value={family}
					setValue={setFamily}
				/>
				<ExploreTaxonomyFilter
					allGenomes={allGenomes}
					filterKey="order"
					value={order}
					setValue={setOrder}
				/>
				<ExploreTaxonomyFilter
					allGenomes={allGenomes}
					filterKey="class"
					value={classT}
					setValue={setClassT}
				/>
				<ExploreTaxonomyFilter
					allGenomes={allGenomes}
					filterKey="phylum"
					value={phylum}
					setValue={setPhylum}
				/>
				<div className="">
					<Label className="flex justify-between items-center h-6">
						<span className="capitalize">EBP Reference Genome</span>{' '}
						{ebpRef && (
							<Button
								variant="ghost"
								size="sm"
								className="opacity-70 h-4 p-2 bg-transparent hover:bg-neutral-200"
								onClick={() => {
									setEbpRef('');
								}}
							>
								clear
							</Button>
						)}
					</Label>
					<Select
						value={ebpRef}
						onValueChange={(newVal) => {
							setEbpRef(newVal);
						}}
					>
						<SelectTrigger className="bg-white text-black hover:border-neutral-400">
							<SelectValue placeholder={<span className="opacity-60">Select Reference Status</span>} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value={'passed'}>
								<span className="flex items-center">
									<Award color="green" size={16} className="mr-1" /> Passed
								</span>
							</SelectItem>
							<SelectItem value={'failed'}>
								<span className="flex items-center">
									<SquareSlash color="red" size={16} className="mr-1" /> Failed
								</span>
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<GenomeList genomes={activeGenomes} />
		</>
	);
};

export default GenomeExplore;
