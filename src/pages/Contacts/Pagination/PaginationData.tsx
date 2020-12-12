import React, { useEffect, useState, useCallback } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { IContacts } from '../../../hooks.ts/useContacts';
import './Pagination.css';

interface IProp {
	setFilteredData: any;
	data: IContacts[]
}

const PaginationData = ({setFilteredData, data}: IProp) => {
	const [page, setPage] = useState(1);
	const [, setCurrentPage] = useState(1);
	const pageSize = 10;

	useEffect(() => {
		let page = Math.floor(data.length / pageSize);
		setPage(page)
	}, [data])

	const handleClickPage = useCallback((event: object, page: number) => {
		setCurrentPage(page);
		const nextPage = page - 1;
		const newFilteredData: IContacts[] = data.slice(nextPage * pageSize, nextPage * pageSize + pageSize);
	
		setFilteredData(newFilteredData)
	}, [setCurrentPage, setFilteredData])

	return (
		<div className='pagination'>
			<Pagination 
				count={page}
				color="primary"
				onChange={(event: object, page: number) => handleClickPage(event, page)}
			/>
		</div>
	)

}

export default PaginationData;