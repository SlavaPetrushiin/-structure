import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TextField from '@material-ui/core/TextField';

interface IContacts {
	name: string
	email: string
	phone: string
	data: string
	location: string
	src: string
	nat: string	
}

const useContacts = () => {
	const [data, setData] = useState<IContacts[]>([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const {results, error} = await api.getUsers();

				if(error) throw new Error(error);

				const contacts = results.map((user: any) => ({
					name: user.name.title + ' ' + user.name.first + ' ' + user.name.last,
					email: user.email,
					phone: user.phone,
					data: user.dob.date,
					location: user.location.country + ' ' + user.location.city,
					src: user.picture.medium,
					nat: user.nat
				}));

				setData(contacts);
				setError('');
			} catch(error) {
				setError(error);
			}finally{
				setIsLoading(false);
			}
		})();
	}, []);
	
	return {
		data,
		error,
		isLoading
	}
}

const Contacts = () => {
	const {data, error, isLoading} = useContacts();
	const tableHead = ['Avatar', 'FullName', 'Birthday', 'Email', 'Phone', 'Location', 'Nationality'];

	const renderTableHead = () => {
		return (
			<TableHead>
				<TableRow>
					{tableHead.map((title, i) => <TableCell key={i}>{title}</TableCell>)}
				</TableRow>
			</TableHead>
		)
	}

	const renderTableBody = () => {
		return (
			<TableBody>
				{data.map((user: IContacts, i) => {
					return (
						<TableRow key={i}>
							<TableCell>
								<img src={user.src} alt={'avatar'}/>
							</TableCell>
							<TableCell>
								{user.name}
							</TableCell>
							<TableCell>
								{user.data}
							</TableCell>
							<TableCell>
								{user.email}
							</TableCell>
							<TableCell>
								{user.phone}
							</TableCell>
							<TableCell>
								{user.location}
							</TableCell>
							<TableCell>
								{user.nat}
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		)
	}

	if(isLoading){
		return <TextField>...Loading</TextField>
	}

	if(error){
		return <TextField>...Error</TextField>
	}

	return (
		<div>
			<Container maxWidth="lg">
				<Table>
					{renderTableHead()}
					{renderTableBody()}
				</Table>
			</Container>
		</div>
	)
};

export default Contacts;