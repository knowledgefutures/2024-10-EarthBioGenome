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
	return (
		<Pagination>
			<PaginationContent>
				{!!prevPageNumber && (
					<PaginationItem>
						<PaginationPrevious
							href={
								prevPageNumber === 1
									? window.location.pathname
									: `?page=${prevPageNumber}`
							}
						/>
					</PaginationItem>
				)}
				{pageNumbers.map((pn) => {
					return (
						<PaginationItem key={pn}>
							<PaginationLink
								isActive={pageNumber === pn}
								href={pn === 1 ? window.location.pathname : `?page=${pn}`}
							>
								{pn}
							</PaginationLink>
						</PaginationItem>
					);
				})}
				{nextPageNumber <= maxPages && (
					<PaginationItem>
						<PaginationNext href={`?page=${nextPageNumber}`} />
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

export default GenomePagination;
