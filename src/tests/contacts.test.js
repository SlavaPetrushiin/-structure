import React from 'react';
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import Contacts from './../pages/Contacts/Contacts';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const users = [
	{
		gender: "male",
		name: {
			title: "Mr",
			first: "Oscar",
			last: "Hansen"
		},
		location: {
			street: {
				number: 750,
				name: "Tornskadevej"
			},
			city: "Kongsvinger",
			state: "Hovedstaden",
			country: "Denmark",
			postcode: 27942,
			coordinates: {
				latitude: "-26.6541",
				longitude: "-97.8707"
			},
			timezone: {
				offset: "-3:00",
				description: "Brazil, Buenos Aires, Georgetown"
			}
		},
		email: "oscar.hansen@example.com",
		login: {
			uuid: "b251e623-9975-422d-b4c9-b7ea5e482680",
			username: "silvermeercat734",
			password: "corinne",
			salt: "IJCtliZ0",
			md5: "486059c0ef945290ff9c44021f9794c9",
			sha1: "d587ceb946cb0ccebced3f54552a961aa8725154",
			sha256: "74e26278a4f20eb4bfdc99e6f3f1643c3774e24a05f2f9350fe40ffcbbf0e5fa"
		},
		dob: {
			date: "1968-12-28T17:03:21.183Z",
			age: 53
		},
		registered: {
			date: "2018-06-21T03:28:40.168Z",
			age: 3
		},
		phone: "38351350",
		cell: "74239547",
		id: {
			name: "CPR",
			value: "281268-0753"
		},
		picture: {
			large: "https://randomuser.me/api/portraits/men/66.jpg",
			medium: "https://randomuser.me/api/portraits/med/men/66.jpg",
			thumbnail: "https://randomuser.me/api/portraits/thumb/men/66.jpg"
		},
		nat: "DK"
	}
]

const handlers = [
	rest.get('https://randomuser.me/api/?results=10', (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				results: users,
			}),
		)
	})
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());


test('contacts get data success', async () => {
	render(<Contacts />);

	const loader = screen.getByTestId('contacts-loader');

	expect(loader).toBeInTheDocument();

	await waitForElementToBeRemoved(loader);

	expect(loader).not.toBeInTheDocument();

	expect(screen.getByTestId('contacts-table-container')).toBeInTheDocument();
	screen.debug();
})

