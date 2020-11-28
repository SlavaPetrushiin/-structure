import React from 'react';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import Avatar from '@material-ui/core/Avatar';
import CopyToText from './../../component/CopyToText';
import getNationality, { countries } from './../../helpers/nationality';
import { IContacts } from '../../hooks.ts/useContacts';

type PropsType = {
	contacts: IContacts[]
};

const ContactsTable = ({ contacts }: PropsType) => {
	const tableHead = ['Avatar', 'FullName', 'Birthday', 'Email', 'Phone', 'Location', 'Nationality'];

	return (
		<Container maxWidth="lg">
			<Table>
				<TableHead>
					<TableRow>
						{tableHead.map((title, i) => <TableCell key={i}>{title}</TableCell>)}
					</TableRow>
				</TableHead>
				<TableBody>
					{contacts.map((user: IContacts) => {
						return (
							<TableRow key={user.id}>
								<TableCell>
									<Avatar alt={user.name} src={user.src} />
								</TableCell>
								<TableCell>
									{user.name}
								</TableCell>
								<TableCell>
									{user.data}, {user.age} years old
								</TableCell>
								<TableCell>
									<CopyToText text={user.email} />
								</TableCell>
								<TableCell>
									<CopyToText text={user.phone} />
								</TableCell>
								<TableCell>
									{user.location}
								</TableCell>
								<TableCell>
									{getNationality(user.nat as keyof typeof countries)}
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</Container>
	)
};

export default ContactsTable;