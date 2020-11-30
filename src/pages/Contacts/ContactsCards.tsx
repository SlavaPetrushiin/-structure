import React from 'react';
import Container from '@material-ui/core/Container';
import { IContacts } from '../../hooks.ts/useContacts';

type PropsType = {
	contacts: IContacts[]
};

const ContactsCards = ({ contacts }: PropsType) => {
	return (
		<Container maxWidth="lg">
			ContactsCards
		</Container>
	)
};

export default ContactsCards;