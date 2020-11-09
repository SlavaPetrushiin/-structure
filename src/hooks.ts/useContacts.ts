import { useEffect, useState } from 'react';
import { format, compareAsc } from 'date-fns';
import api from '../api/api';

export interface IContacts {
	name: string
	email: string
	phone: string
	data: string
	age: number
	location: string
	src: string
	nat: string
	id: string
	gender: string
}

const useContacts = (): {data: IContacts[], error: string, isLoading: boolean } => {
	const [data, setData] = useState<IContacts[]>([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const { results, error } = await api.getUsers();

				if (error) throw new Error(error);

				const contacts = results.map((user: any) => ({
					name: user.name.title + ' ' + user.name.first + ' ' + user.name.last,
					email: user.email,
					phone: user.phone,
					data: format(new Date(user.dob.date), 'dd.MM.yyyy'),
					age: user.dob.age,
					location: user.location.country + ' ' + user.location.city,
					src: user.picture.medium,
					nat: user.nat,
					id: user.login.uuid,
					gender: user.gender
				}));

				setData(contacts);
				setError('');
			} catch (error) {
				setError(error);
			} finally {
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

export default useContacts;


