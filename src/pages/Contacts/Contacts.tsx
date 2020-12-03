import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import CloseIcon from '@material-ui/icons/Close';
import ContactsTable from './ContactsTable';
import useContacts, { IContacts } from '../../hooks.ts/useContacts';
import ContactsCards from './ContactsCards';
import { DATA_VIEW_MODES } from './constans';
import ToggleGroupContacts from './ToggleGroupContacts';
import { useDataViewMode } from './useDataViewMode';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			marginTop: 20
		},
		contactsHead: {
			marginBottom: 20
		},
		root: {
			padding: '2px 4px',
		},
		searchInput: {
			width: 350,
			border: '1px solid rgba(224, 224, 224, 1)',
			display: 'flex',
			alignSelf: 'center',
			marginRight: 30
		},
		selectInput: {
			width: 350,
			border: '1px solid rgba(224, 224, 224, 1)',
			display: 'flex',
			alignSelf: 'center',
			marginRight: 30
		},
		input: {
			marginLeft: theme.spacing(1),
			flex: 1,
		},
		iconButton: {
			padding: 10,
		},
		divider: {
			height: 28,
			margin: 4,
		},
		formControl: {
			minWidth: 120,
		},
		search: {
			width: 250
		}
	}),
);

const Contacts = () => {
	const { data, error, isLoading } = useContacts();
	const classes = useStyles();
	const [filteredData, setFilteredData] = useState<IContacts[]>([]);
	const [genderFilter, setGenderFilter] = useState(10);
	const [nationalityFilter, setNationalityFilter] = useState('');
	const [dataViewMode, setDataViewMode] = useDataViewMode();
	
	useEffect(() => {
		setFilteredData(data);
	}, [data])

	useEffect(() => {
		setFilteredData(data.filter(man => man.nat.includes(nationalityFilter)));
	}, [nationalityFilter])

	if (isLoading) {
		return <Typography>...Loading</Typography>
	}

	if (error) {
		return <Typography>...Error</Typography>
	}

	const handleSelect = (event: any) => {
		switch (event.currentTarget.value) {
			case '10': {
				setFilteredData([...data]);
				break;
			}
			case '20': {
				setFilteredData(data.filter(man => man.gender === 'male'));
				break;
			}
			case '30': {
				setFilteredData(data.filter(man => man.gender === 'female'));
				break;
			}
		}
	}

	const handleNationality = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNationalityFilter(event.currentTarget.value.toUpperCase());
	}

	return (
		<Container className={classes.container} maxWidth="lg" >
			<Grid item xs={12}>
				<ToggleGroupContacts dataViewMode={dataViewMode} setDataViewMode={setDataViewMode}/>
			</Grid>
			<Grid item xs={12}>
				<Box className={classes.root} display="flex" justifyContent="space-between" alignItems="center" >
					<Box display="flex">
						<Box className={classes.searchInput}>
							<InputBase
								className={classes.input}
								placeholder="Search Google Maps"
								inputProps={{ 'aria-label': 'search google maps' }}
							/>
							<Divider className={classes.divider} orientation="vertical" />
							<IconButton type="submit" className={classes.iconButton} aria-label="search">
								<SearchIcon />
							</IconButton>
						</Box>
						<Box className={classes.selectInput}>
							<FormControl>
								<Select
									native
									inputProps={{
										name: 'gender',
										defaultValue: genderFilter
									}}
									onChange={handleSelect}
								>
									<option value={10}>all</option>
									<option value={20}>man</option>
									<option value={30}>women</option>
								</Select>
							</FormControl>
						</Box>
						<Box>
							<FormControl>
								<FilledInput id="component-filled" placeholder="Nationality" onChange={handleNationality} />
							</FormControl>
						</Box>
					</Box>
					<Box display="flex">
						<CloseIcon />
					</Box>
				</Box>
			</Grid>
			<Grid container spacing={5}>
				{
					dataViewMode === DATA_VIEW_MODES.GRID
						?	<ContactsCards contacts={filteredData}/>
						: <ContactsTable contacts={filteredData} />
				}
			</Grid>
		</Container>
	)
};

export default Contacts;
