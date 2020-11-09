import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ReplayIcon from '@material-ui/icons/Replay';
import AppsIcon from '@material-ui/icons/Apps';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import CloseIcon from '@material-ui/icons/Close';
import ContactsTable from './ContactsTable';
import useContacts from '../../hooks.ts/useContacts';

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

	if (isLoading) {
		return <Typography>...Loading</Typography>
	}

	if (error) {
		return <Typography>...Error</Typography>
	}

	return (
		<Container className={classes.container} maxWidth="lg" >
			<Grid item xs={12}>
				<Box className={classes.contactsHead} display="flex" justifyContent="space-between">
					<Typography variant="h4">Contacts</Typography>
					<Box display="flex">
						<Box>
							<ReplayIcon />
						</Box>
						<Box>
							<AppsIcon />
						</Box>
						<Box>
							<ListAltIcon />
						</Box>
					</Box>
				</Box>
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
										id: 'filled-gender-native-simple',
									}}
								>
									<option aria-label="Gender" value="" />
									<option value={10}>all</option>
									<option value={20}>man</option>
									<option value={30}>women</option>
								</Select>
							</FormControl>
						</Box>
						<Box>
							<FormControl>
								<FilledInput id="component-filled" placeholder="Nationality"/>
							</FormControl>
						</Box>
					</Box>
					<Box display="flex">
						<CloseIcon />
					</Box>
				</Box>
			</Grid>
			<Grid item xs={12}>
				<ContactsTable contacts={data} />
			</Grid>
		</Container>
	)
};

export default Contacts;