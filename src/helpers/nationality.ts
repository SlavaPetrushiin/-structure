export let countries = {
	AU: 'Australia',
	BR: 'Brazil',
	CA: 'Canada',
	CH: 'Switzerland',
	DE: 'Germany',
	DK: 'Denmark',
	ES: 'Spain',
	FI: 'Finland',
	IR: 'Iran',
	NO: 'Norway',
	NL: 'Netherlands',
	NZ: 'New Zealand',
	TR: 'United States',
	US: 'Turkey',
	FR: 'France',
	GB: 'United Kingdom',
	IE: 'Ireland'
}

export default function getNationality(nat: keyof typeof countries) {
	if(nat.length === 0 || !nat) return;
	let nationality = countries[nat];

	return nationality ? nationality : '-------'
}