import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Button } from '~/components/ui/button';
import { ListFilter } from 'lucide-react';
import { useState } from 'react';
import { allAdminData } from '~/data/allAdminData';

type Props = {};

const AdminPubsTable = ({}: Props) => {
	const [tabValue, setTabValue] = useState('Species');
	const pubTypes = Object.keys(allAdminData);
	return (
		<div>
			<div className="flex items-center justify-between">
				<Tabs
					value={tabValue}
					onValueChange={(newValue) => {
						setTabValue(newValue);
					}}
					className="w-[400px] my-6"
				>
					<TabsList>
						<TabsTrigger value="All">All</TabsTrigger>
						{pubTypes.map((pubType) => {
							return (
								<TabsTrigger key={pubType} value={pubType}>
									{pubType}
								</TabsTrigger>
							);
						})}
					</TabsList>
				</Tabs>
				<Button variant="outline" size="sm" className="h-8 gap-1">
					<ListFilter className="h-3.5 w-3.5" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
				</Button>
			</div>
		</div>
	);
};

export default AdminPubsTable;
