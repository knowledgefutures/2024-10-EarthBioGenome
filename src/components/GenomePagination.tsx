import React from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '~/components/ui/pagination';

type Props = {
	pageNumber: number;
	maxPages: number;
};

const getPageNumbers = (pageNumber: number, maxPages: number) => {
	const pages = [];
	const startPage = Math.max(1, pageNumber - 1);
	const endPage = Math.min(maxPages, pageNumber + 1);

	for (let i = startPage; i <= endPage; i++) {
		pages.push(i);
	}

	return pages;
};

const GenomePagination: React.FC<Props> = ({ pageNumber, maxPages }) => {
	const pageNumbers = getPageNumbers(pageNumber, maxPages);
	const prevPageNumber = pageNumber - 1;
	const nextPageNumber = pageNumber + 1;
	const updateSearchParams = (value: string) => {
		const params = new URLSearchParams(window.location.search);
		if (value) {
			params.set('page', value);
		} else {
			params.delete('page');
		}
		const paramsString = params.toString();
		window.history.replaceState(
			{},
			'',
			`${window.location.pathname}${paramsString.length ? '?' : ''}${paramsString}`
		);
		window.location.reload();
	};
	return (
		<Pagination>
			<PaginationContent>
				{!!prevPageNumber && (
					<PaginationItem>
						<PaginationPrevious
							onClick={() => {
								updateSearchParams(prevPageNumber === 1 ? '' : `${prevPageNumber}`);
							}}
						/>
					</PaginationItem>
				)}
				{pageNumbers.map((pn) => {
					return (
						<PaginationItem key={pn}>
							<PaginationLink
								isActive={pageNumber === pn}
								onClick={() => {
									updateSearchParams(pn === 1 ? '' : `${pn}`);
								}}
							>
								{pn}
							</PaginationLink>
						</PaginationItem>
					);
				})}
				{nextPageNumber <= maxPages && (
					<PaginationItem>
						<PaginationNext
							onClick={() => {
								updateSearchParams(`${nextPageNumber}`);
							}}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

export default GenomePagination;
